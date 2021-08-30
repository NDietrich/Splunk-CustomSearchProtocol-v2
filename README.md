# About this Repository
This repository holds resources and example code to document the specifications for Splunk's Custom Search Protocol v2. This message-passing protocol is used with custom search commands in Splunk, and all the information here is based on my reverse-engineering the protocol in order to implement the [CyberChef for Splunk](https://splunkbase.splunk.com/app/5348/) Add-on that implements a custom search command in node.js.  The information here supports my [Splunk .conf 2021 presentation](https://conf.splunk.com/learn/session-catalog.html?search=1387b) on this topic.

This repository is intended to help provide a resource for anyone wanting to implement their own Custom Search Command in Splunk in a language other than Python 3.  If you plan on using Python 3 for your command: you should absolutely use the [Splunk Enterprise SDK for Python](https://github.com/splunk/splunk-sdk-python), rather than implement the protocol yourself.

# Important Notes
Implementing the protocol manually isn't easy, and there are a lot of edge-cases to worry about. I highly recomend you try to use Python 3 with the SDK, rather than implementing it yourself.  If you're set on implementing it yourself: this repository holds a lot of information and things to watch out for in order to make things easier.

This repo does not hold the formal specification for the protocol, as I was not able to obtain that (I don't work for Splunk).  It contains the information that I've determined by reverse engineering the protocol through trial and error,  reading what sparse information exists online, and what worked for me when I wrote my CyberChef for Splunk Add-on.  Therefore: this information is not 100% complete (although there's enough to implement it yourself), and it's certainly possible that some of the information is incorrect and/or incomplete. If you find any errors or missing informaition, please [let me know](mailto:noah@sublimerobots.com?subject=Custom%20Search%20Protocol).

This repo uses node.js for its example code, but you're not constrained to that language. You can implement the protocol in any language, based on the information in this repository.

I'm not a javascript/node.js programmer, I learned enough in order to implement the CyberChef for Splunk Add-on, but if you look at that code or the example code in this repository, you'll find that it's not efficient or leveraging node.js's asynchronous model efficiently, but it does work and will provide a good understanding of how to implement the protocol yourself.

# Quick Overview of the Protocol
Splunk's Custom Search Protocol v2 uses message passing over STDIN/STDOUT pipes. When Splunk encounters a Custom Search Command in your SPL, it will use the information in the command's [commands.conf](https://docs.splunk.com/Documentation/Splunk/8.2.1/Admin/Commandsconf) to execute your code.  Splunk will then open a STDOUT pipe for your program, and send messages to your program via STDOUT. Your program will read STDIN, and reply to Splunk by writing to STDOUT.

All messages have a header, metadata, and an optional payload. The header gives you the size in characters of the metatada and the payload. The metadata is json-encoded. The optional payload is csv-encoded.  All data is UTF-8 (Unicode).  

Splunk specifies two types of messages using this format: **getinfo** and **execute** messages, and the message type is identified by the *action* field in the json metatdata.  Getinfo messages are for passing information between Splunk and your command, and execute messages are used to pass data (csv-encoded in the payload section of the message) between Splunk and your command. The data passed are the events that your command will operate on before returning to Splunk.  There will be a single getinfo sent from Splunk to your command. Your command will send a single getinfo reply to splunk, and then execute messages will be sent between splunk and your command.

# Layout of this Repository
* [example_messages](./example_messages) directory contans simple examples of the actual text that is written/read from stdin/stdout for different types of custom search commands.

* [presentations](./presentations) directory contains presentations that are helpful in understanding the protocol and implementing it yourself.

* [src](./src) directory contains an example Splunk app with custom search commands for the four types of commands, as well as a generating command.

# Helpful Links
* [Create custom search commands for apps in Splunk Cloud Platform or Splunk Enterprise](https://dev.splunk.com/enterprise/docs/devtools/customsearchcommands/) - A good place to start.

* [CyberChef for Splunk](https://splunkbase.splunk.com/app/5348/) - The Splunk Add-on that I created to implement the Custom Search Protocol in node.js.

* [
DEV1387B - Deep-Dive Into the Custom Search Protocol v2: How To Implement a Custom Search Command in Any Language](https://conf.splunk.com/learn/session-catalog.html?search=1387b) - The Splunk .conf 2021 presentation I gave on the Custom Search Protocol.

