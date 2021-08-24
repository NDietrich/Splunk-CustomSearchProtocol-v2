
/******************************************************************************
*	generateevents.js	Splunk Example Custom Search Command
*
*	Generate 100 events in the time range specified by your search.
*	this is a generating stateful command (not distributed)
*
*	author: 	Noah Dietrich 
*	contact:	noah@SublimeRobots.com
*	website:	https://github.com/NDietrich/Splunk-CustomSearchProtocol-v2/
*
*
******************************************************************************/


/******************************************************************************
* 			load required libraries
******************************************************************************/
const fs = require('fs');		// write logfiles



/******************************************************************************
* 			Global Variables
******************************************************************************/

var logfile = ''				// logfile location, defaults to dispatch_dir if not set explicity
const logFullMessages = false	// output the data read from stdin and written to stdout	

var searchOptions = null	// all the info from the getinfo json metatdata as a object
var message = null			// holds the received message (metadata and payload, not the header)

var metadataSize = null		// holds the size (from the header) of the metatdata
var payloadSize = null		// holds the size (from the header) of the payload




/******************************************************************************
* 			Functions that are command-specific
*
*	(you can edit these functions if creating your own custom search command)
******************************************************************************/

/*************************************************
* build a getinfo object
*	
*
* return a string in json format
*/
const getinfo_reply = function(){
	log("Entering function 'getinfo_reply'.")

	// converty reply to json string
	try {
		jsonReply = JSON.stringify({
			type 			: 'stateful',		// default is streaming (or stateful, events, reporting)
			required_fields : ['_time','data','generated_index','random_number'],			// could be dynamically determined, defaults to all
			generating : true,

			// other optional fields:
			// required_fields : ['age','name','whatever']	// require multiple fields
			// generating : true		// defaults to false
			// maxwait : 100			// number of seconds before splunk will terminate process
			// streaming_preop : 'spl'	// spl command to run before procesing the data (streaming only)
			
			// send non-terminating warnings and errors back to display in splunk web (few examples, choose one):
			//inspector : {messages: [["ERROR","your error"]]},
			//inspector : {messages: [["WARN","a warning"],["WARN","another warning"]]},			

		 })
	} catch(err) { halt_on_error("Error building json getinfo metadata reply: " + err.message) }


	log("\tReturning string: " + jsonReply)
	log("Exiting function 'getinfo_reply'.")
	return jsonReply;

}

/*************************************************
* generate payload (csv data in a string)
*	
*
* returns a string (csv)
*/
const generate_payload = function(){
	log('Entering function generate_payload.')

	// load required libraries
	try {
		var stringify = require('csv-stringify/lib/sync')
	} catch (err) {
		halt_on_error("Error loading required csv modules: " + err.message)
	}

	// create 1000 events
	events = []
	start	= parseInt(searchOptions.searchinfo.earliest_time)
	end		= parseInt(searchOptions.searchinfo.latest_time)

	for(i=0;i<+1000;i++){
		events.push(
			{	"_time":	Math.floor(Math.random() * (end-start)) + start,
				//"_time": start + i,
				"generated_index": i,
				// generate a random number between -10,000 and 10,000
				"random_number": Math.floor(Math.random() * (20000)) + -10000,
				'data': Math.random().toString(36).slice(-5),
				"_chunked_idx"		:'',
				"__mv__time"		:'',
				"__mv__chunked_idx"	:'',
			}
		)
	}

	// sort events
	events.sort((a,b) => (a._time > b._time) ? 1 : ((b._time > a._time) ? -1 : 0))

	log("\tDone processing records. " + events.length +" records created.")

	// convert objects back to csv string and save back to our message
	var modifiedData = null
	try {
		// will convert value to NaN if not passed an integer, or will round doubles down.
		modifiedData = stringify(events, {header: true })
	} catch (err) {
		halt_on_error("Error converting results to CSV: " + err.message)
	}

	log('Exiting function generate_payload.')
	return modifiedData
}




/******************************************************************************
* 			Helper Functions
******************************************************************************/


/*************************************************
* Log a string to the local logfile 
*	
*
* @param {string}	msg	the message to log
*/
const log = function(msg){
	if(logfile != "" ){
		fs.appendFileSync(logfile, "(PID:" + process.pid + ") "+ msg+ "\n", function (err) { })
	}
}

/***************************************************
* send an error message back to Splunk and halt gracefully
*	
* @param {string}	msg	the message to log
*/
const halt_on_error = function (msg){

	log("halt_on_error: " + msg + "\n\n")
	// Remove all newlines, backslashes, and double-quotes from 'msg'
	msg = msg.replace(/(\r\n|\n|\r|\u0d0a)/gm," ")
	msg = msg.replace(/\\/g, "\\\\");
	msg = msg.replace(/\"/gm," ")

	const metadata = '{"finished":true,"error":"'  + msg +'"}'
	const transportHeader = 'chunked 1.0,' + metadata.length + ",0\n"
	process.stdout.write(transportHeader + metadata)

}

//-----------------------------------------------------
//
//		            BEGIN HERE
//
//-----------------------------------------------------

process.stdin.setEncoding('utf8')
process.stdin.on('readable', () => {
    log('---------------------------------------------------')
    log('Entering process.stdin.on')

    var chunk = process.stdin.read();

    if (chunk == null) { log("Empty message recived on stdin, returning"); return } // sometimes at the end, splunk sends an empty message

    log ('Read ' + chunk.length + ' characters of data from stdin.')
    if(logFullMessages) { log('Received Chunk from STDIN: \n<<SOF>>' + chunk + "<<EOF>>")}

	// Do we have only a partial message, and we're reading more of it?
	if(message != null){
		log("Adding to partial message. Message size is: " + message.length + ", Chunk size is: " + chunk.length +", Total needed message size is: "+ (metadataSize + payloadSize) )
		message += chunk;

		if(message.length != (metadataSize + payloadSize)){
			// we don't have a full message yet, read more from stdin
			// TODO: check for overlength message
			log("Complete message not yet received." )
			return;
		} else{
			log("Recieved remainder of partial message.")
		}

	} else {
		// parse the new message
		log("New Message Recieved:")
		// parse first line of chunk for size of json and payload
		const rawHeader = chunk.split(/\n/,1)[0]	
		const headerRegex = /^chunked 1.0,(\d+),(\d+)/;
		const sizes = rawHeader.match(headerRegex);
		
		metadataSize = parseInt(sizes[1])
		payloadSize = parseInt(sizes[2])

		log('\t - MetadataSize (from header):     ' + metadataSize)
		log('\t - PayloadSize (from header):      ' + payloadSize)

		// remove the header from the data and continue
		message = chunk.slice(rawHeader.length + 1)
		log('\t - Actual received message size:   ' + message.length )

		// do we have a complete message at this point?
		const recSize = metadataSize + payloadSize

		if (message.length !=  recSize){
			log("Incomplete new message recieved, waiting for rest.")
			return;
		}

	}


	// We have a complete message at this point
	log("Complete message recieved. Processing Json metadata")

	// parse the metatdata into a json object
	const rawMetadata = message.slice(0, metadataSize )
	var parsedMetadata = null
	try{ parsedMetadata = JSON.parse(rawMetadata)
	} catch (err){ halt_on_error("Error Parsing json metadata: " + err.message) }

	log("json metadata parsed: \n" + JSON.stringify(parsedMetadata, null, 4))


	// is this a getinfo or execute message?
	if(parsedMetadata.action == 'getinfo'){
		// save the options to a global variable if this is a getinfo
		searchOptions = parsedMetadata

		log("getinfo message recieved")

		// if we have a valid SID (nnnnnnnnnn.n+) and logfile is empty (not explicity set for testing), start logging there
		if (logfile == '' && searchOptions.searchinfo.sid.match(/^\d{10}\.\d+$/)){
			logfile = searchOptions.searchinfo.dispatch_dir + "\\debug.log"

			// log a few extra things if we're starting up logging now
			log("dispatch_dir identifed, starting logging to: " + logfile)
			if(logFullMessages) { log('Received Chunk from STDIN: \n<<SOF>>' + chunk + "<<EOF>>")}
			log("json metadata parsed: \n" + JSON.stringify(parsedMetadata, null, 4))	
		}
		
		// get a string representation of our json reply
		jsonReply = getinfo_reply()

		// send our getinfo reply
		const transportHeaderReply = 'chunked 1.0,' + jsonReply.length + ',0'
		log("Sending GETINFO SplunkMessage.")
		if(logFullMessages) { log("<<SOF>>" + transportHeaderReply +"\n" + jsonReply + "<<EOF>>") }
		process.stdout.write(transportHeaderReply + "\n" + jsonReply)

		// reset our message variables for the next inbound message (keep the search parameters though)
		message = null
		metadataSize = null
		payloadSize = null
		return;
	
	} else if (parsedMetadata.action == 'execute'){
		log('execute message recieved')
		
		// create new records
		modifiedPayload = generate_payload()

		// Return our payload
		jsonReply = '{"finished":' + true + '}'
		const transportHeaderReply = 'chunked 1.0,' + jsonReply.length + ',' + modifiedPayload.length

		log("Sending execute SplunkMessage")
		if(logFullMessages) { log( "<<SOF>>" + transportHeaderReply +"\n" + jsonReply + modifiedPayload + "<<EOF>>" ) }

		process.stdout.write(transportHeaderReply + "\n" + jsonReply + modifiedPayload)

		// reset our message for the next message
		message = null
		metadataSize = null
		payloadSize = null

		return

	} else {
		// unknown action
		halt_on_error("unknown action found in jsom metadata: " + parsedMetadata.action)
	}

	// We should never make it here
	halt_on_error("Unexpected error: unreachable code reached.")



}) // end process.stdin.on (readable)
