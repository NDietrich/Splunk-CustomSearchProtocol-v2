# Example Messages
This folder contains examples of the text that is passed between Splunk and your custom search command. This will help you to understand the types of data and the formatting that's passed via stdin/stdout.

# About the Data Used
The records passed to the custom search command in these examples come from the following index:
|Item|Value|
|---|---|
|Input Type     |Uploaded File|
|File Name		|sample_data.json|
|Source Type	|\_json|
|Host			|firefly|
|Index			|beetles|

And the source data:
```json
{"date":"1627354100.265","name":"John","age":"52","uid":"01"}
{"date":"1627354180.246","name":"Paul","age":"96","uid":"02"}
{"date":"1627354223.584","name":"George","age":"25","uid":"03"}
{"date":"1627354339.384","name":"Ringo","age":"18","uid":"04"}
{"date":"1627354345.934","name":"Noah","age":"66","uid":"05"}
```

Running the following search to pull this data:
```
source="sample_data.json" host="firefly" index="beetles" sourcetype="_json" 
|  table *
```

Gives this tabular output in Splunk:

|age|date|date\_hour|date\_mday|date\_minute|date\_month|date\_second|date\_wday|date\_year|date\_zone|eventtype|host|index|linecount|name|punct|source|sourcetype|splunk\_server|splunk\_server\_group|tag|tag::eventtype|timeendpos|timestartpos|uid|\_raw|\_time|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|52|1627354100.265|2|27|48|july|20|tuesday|2021|0||firefly|beetles|1|John|{"""":""."","""":"""","""":"""","""":""""}|sample\_data.json|\_json|FIREFLY-WIN||||23|9|01   |{""date"":""1627354100.265"",""name"":""John"",""age"":""52"",""uid"":""01""}|2021-07-27T05:48:20.265+0300|
|96|1627354180.246|2|27|49|july|40|tuesday|2021|0||firefly|beetles|1|Paul|{"""":""."","""":"""","""":"""","""":""""}|sample\_data.json|\_json|FIREFLY-WIN||||23|9|02   |{""date"":""1627354180.246"",""name"":""Paul"",""age"":""96"",""uid"":""02""}|2021-07-27T05:49:40.246+0300|
|25|1627354223.584|2|27|50|july|23|tuesday|2021|0||firefly|beetles|1|George|{"""":""."","""":"""","""":"""","""":""""}|sample\_data.json|\_json|FIREFLY-WIN||||23|9|03 |{""date"":""1627354223.584"",""name"":""George"",""age"":""25"",""uid"":""03""}|2021-07-27T05:50:23.584+0300|
|18|1627354339.384|2|27|52|july|19|tuesday|2021|0||firefly|beetles|1|Ringo|{"""":""."","""":"""","""":"""","""":""""}|sample\_data.json|\_json|FIREFLY-WIN||||23|9|04  |{""date"":""1627354339.384"",""name"":""Ringo"",""age"":""18"",""uid"":""04""}|2021-07-27T05:52:19.384+0300|
|66|1627354345.934|2|27|52|july|25|tuesday|2021|0||firefly|beetles|1|Noah|{"""":""."","""":"""","""":"""","""":""""}|sample\_data.json|\_json|FIREFLY-WIN||||23|9|05   |{""date"":""1627354345.934"",""name"":""Noah"",""age"":""66"",""uid"":""05""}|2021-07-27T05:52:25.934+0300|







