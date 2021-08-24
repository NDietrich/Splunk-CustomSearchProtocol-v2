# Custom Search Command Examples
This folder contains a Splunk Add-on that provides five simple Custom Search Commands written in javascript / node.js.  To install this app: copy the [CustomSearchCommandExamples](./CustomSearchCommandExamples) folder to the *%SPLUNK_HOME/etc/apps folder*, and restart Splunk.

# Commands
This Add-on provides five custom search commands (details below):
* doubleage
* accumages
* sortages
* averageage
* generateevents

There are four types of Custom Search Commands (excluding generating commands). This is identified by the **type** field in your getinfo reply to Splunk
1. Streaming
2. Stateful
3. Events
4. Reporting

Each command has different restrictions and features:

|type       |Global State  |Reorders Events |Transforming   |Needs all results  | Example   |
|---        |---    |---            |---            |---                |---        |
|streaming  |No        |No| No| No| eval, where, rex, **doubleage**|
|stateful   |Yes        |No| No| No| accum, streamstats, dedup, **accumages**|
|events     |Yes        |Yes| No| Yes| sort, eventstats, **sortages**|
|reporting  |Yes| Yes| Yes| Yes| stats, **averageage** |

Streaming is the most efficient, as it can be distributed (global state is not required). The other commands must run on the search head.  For commands identified that 'reorder events': that's optional.


# How to run these Custom Search Commands
These custom search commands are all very simple, and are meant to highlight how to write your own custom search command simply.  Most of these commands require that your input data has an 'age' field contianing an integer.  You can use the [sample_data.json](/sample_data/sample_data.json) file for your testing if you like. This file contains the following records:


```json
{"date":"1627354100.265","name":"John","age":"52","uid":"01"}
{"date":"1627354180.246","name":"Paul","age":"96","uid":"02"}
{"date":"1627354223.584","name":"George","age":"25","uid":"03"}
{"date":"1627354339.384","name":"Ringo","age":"18","uid":"04"}
{"date":"1627354345.934","name":"Noah","age":"66","uid":"05"}
```

 Import this json file into Splunk with the following settings:
|Item|Value|
|---|---|
|Input Type     |Uploaded File|
|File Name		|sample_data.json|
|Source Type	|\_json|
|Index			|beetles|

Verify you can retreive these 5 events by running the following search:
```
index="beetles" earliest=07/27/2021:00:00:00 latest=07/27/2021:24:00:00
```

Now you should be able to test the included custom search commands with this data.


## **doubleage** Custom Search Command
This custom search command is a streaming (distributed) custom search command which will double the value of the integer in the 'age' field.

```
search index=beetles earliest=07/27/2021:00:00:00 latest=07/27/2021:24:00:00
| eval oldage = age
| doubleage
| table name, oldage, age
```
The value in 'age' will be twice that of 'oldage'. Your output should be this:

name|oldage|age
|---|------|---|
Noah|66|132
Ringo|18|36
George|25|50
Paul|96|192
John|52|104


## **accumages** Custom Search Command
This custom search command is a stateful command. Similar to the streaming command, it is not distributed and will only run on the Search head. This command will keep a running total of the sum of the ages for each record, saved in the 'accum_ages' field. Run it as follows:

```
index=beetles earliest=07/27/2021:00:00:00 latest=07/27/2021:24:00:00
| accumages 
| table name, age, accum_age
```

and you'll see the following output:
name|age|accum\_age
|---|------|---|
Noah|66|66
Ringo|18|84
George|25|109
Paul|96|205
John|52|257


## **sortages** Custom Search Command
This custom Search Command is an 'events' type of command. This command will sort (re-order) the results based on the value of the 'age' field.  Run the command as follows:
```
index=beetles earliest=07/27/2021:00:00:00 latest=07/27/2021:24:00:00
| sortages 
| table name, age
```
You'll have the following output:
name|age
---|---
Ringo|18
George|25
John|52
Noah|66
Paul|96


## **averageage** Custom Search Command
This is a reporting custom search command. It calculates the average value in the 'age' field for all events (the mean value), and displays only that number (not the events). Run this command as follows:
```
index=beetles earliest=07/27/2021:00:00:00 latest=07/27/2021:24:00:00
| averageage 
```
Your output will be:
|average|
|-------|
|51.4|

## **generateevents** Custom Search Command
This is a genreating command, and must be the first command in the SPL pipleline.  This is a stateful command (run on the search head). This command will  generate 1000 events, with the \_time randomly set (within the time range selected for your search), and will include the 'generated\_index' field which is the order the event was generated, a 'random\_number' field with a random number between -10000 and 10000, and a 'data' field with a random five-character string.  Run this command as follows make sure to include the pipe at the start):
```
| generateevents
| table *
```
Your output will be similar to the following (truncated results shown):

data|generated\_index|random\_number|\_time
---|---|---|---
i363b|590|1450|"2021-08-23T08:01:17.000+0300"
lr44x|381|"-8443"|"2021-08-23T08:04:23.000+0300"
tih87|536|3529|"2021-08-23T08:05:41.000+0300"
ubw6l|696|"-2707"|"2021-08-23T08:05:54.000+0300"
nu0b1|418|"-3192"|"2021-08-23T08:08:18.000+0300"
perc5|910|"-5851"|"2021-08-23T08:09:06.000+0300"
ixn4j|150|4191|"2021-08-23T08:09:46.000+0300"
ss738|332|1710|"2021-08-23T08:10:12.000+0300"
sofpx|777|"-9946"|"2021-08-23T08:10:33.000+0300"
hmk3h|33|"-7090"|"2021-08-23T08:11:58.000+0300"


# Create your Own node.js Command From the Examples
All the examples here can be modified to create your own Custom Search Command.
you will need to modify two functions: the **getinfo\_reply** function to make sure you're sending back the correct information to Splunk describing your command (what fields you want, and your type of command), and you'll need to modify the **modify\_payload** function (or **generate\_payload** function for a generating command) for the fields you want to edit and return.  

Start by choosing the .js file for the type of command you want (streaming, stateful, events, reporting, generating) and modify only those two functions. Enable logging as needed (you'll probably want it during testing).  You can set the **logfile** variable to a static location (c:\\temp\\debug.log or ~/debug.log for example) during testing so you don't have to keep tracking down the **dispatch\_dir** each time you run your command.  You may also want to set **logFullMessages** to *true* if you need to see the actualy body of the messages passed from Splunk (good for troubleshooting weirdness).

You can run your command from the command line as follows:
```
%SPLUNK_HOME%/bin/splunk search "index=beetles | doubleage | table name,age" -app CustomSearchCommandExamples
```
