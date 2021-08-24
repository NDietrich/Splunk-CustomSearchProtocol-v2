# Example messgaes passed between Splunk and the 'sortages' custom search command.

The command that was run:
```
index=beetles | sortages | table name, age
```


## Initial GETINFO message from Splunk:
```
chunked 1.0,757,0
{"action":"getinfo","preview":false,"streaming_command_will_restart":false,"searchinfo":{"args":[],"raw_args":[],"dispatch_dir":"C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629787283.118","sid":"1629787283.118","app":"CustomSearchCommandExamples","owner":"admin","username":"admin","session_key":"d3A^OuZnOSOCReGmHdTTDBSZOQ4qxnyVY9pY3fBUhGBHefXa4aPEut3SDRbC^qpfNP4G3HFvXt0gG0Ogv_i304YDIypd3IXi9oxvAxNnoP4Vc2zis^EuDIAAZN","splunkd_uri":"https://127.0.0.1:8089","splunk_version":"8.2.1","search":"search%20index%3Dbeetles%20%7C%20sortages%20%20%7C%20table%20name%2C%20age%20%7C%20head%20100%20%7C%20export%20add_timestamp%3Df%20add_offset%3Dt%20segmentation%3Draw","command":"sortages","maxresultrows":50000,"earliest_time":"0","latest_time":"0"}}
```
(note, the json is displayed at the bottom of this page in easier to read format)


## Initial GETINFO reply back to Splunk
```
chunked 1.0,43,0
{"type":"events","required_fields":["age"]}
```

## EXECUTE message from Splunk
```
chunked 1.0,36,927
{"action":"execute","finished":true}index,"_time","_raw","_sourcetype","_indextime","_subsecond",name,age,"__mv_index","__mv__time","__mv__raw","__mv__sourcetype","__mv__indextime","__mv__subsecond","__mv_name","__mv_age"
beetles,"1627354345.934","{""date"":""1627354345.934"",""name"":""Noah"",""age"":""66"",""uid"":""05""}","_json",1627355502,".934",Noah,66,,,,,,,,
beetles,"1627354339.384","{""date"":""1627354339.384"",""name"":""Ringo"",""age"":""18"",""uid"":""04""}","_json",1627355502,".384",Ringo,18,,,,,,,,
beetles,"1627354223.584","{""date"":""1627354223.584"",""name"":""George"",""age"":""25"",""uid"":""03""}","_json",1627355502,".584",George,25,,,,,,,,
beetles,"1627354180.246","{""date"":""1627354180.246"",""name"":""Paul"",""age"":""96"",""uid"":""02""}","_json",1627355502,".246",Paul,96,,,,,,,,
beetles,"1627354100.265","{""date"":""1627354100.265"",""name"":""John"",""age"":""52"",""uid"":""01""}","_json",1627355502,".265",John,52,,,,,,,,
```



## EXECUTE reply message to Splunk with modified data
```
chunked 1.0,17,871
{"finished":true}index,_time,_raw,_sourcetype,_indextime,_subsecond,name,age,__mv_index,__mv__time,__mv__raw,__mv__sourcetype,__mv__indextime,__mv__subsecond,__mv_name,__mv_age
beetles,1627354339.384,"{""date"":""1627354339.384"",""name"":""Ringo"",""age"":""18"",""uid"":""04""}",_json,1627355502,.384,Ringo,18,,,,,,,,
beetles,1627354223.584,"{""date"":""1627354223.584"",""name"":""George"",""age"":""25"",""uid"":""03""}",_json,1627355502,.584,George,25,,,,,,,,
beetles,1627354100.265,"{""date"":""1627354100.265"",""name"":""John"",""age"":""52"",""uid"":""01""}",_json,1627355502,.265,John,52,,,,,,,,
beetles,1627354345.934,"{""date"":""1627354345.934"",""name"":""Noah"",""age"":""66"",""uid"":""05""}",_json,1627355502,.934,Noah,66,,,,,,,,
beetles,1627354180.246,"{""date"":""1627354180.246"",""name"":""Paul"",""age"":""96"",""uid"":""02""}",_json,1627355502,.246,Paul,96,,,,,,,,
```


# prettified JSON getinfo message from Splunk:
```json
{
    "action": "getinfo",
    "preview": false,
    "streaming_command_will_restart": false,
    "searchinfo": {
        "args": [],
        "raw_args": [],
        "dispatch_dir": "C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629787283.118",
        "sid": "1629787283.118",
        "app": "CustomSearchCommandExamples",
        "owner": "admin",
        "username": "admin",
        "session_key": "d3A^OuZnOSOCReGmHdTTDBSZOQ4qxnyVY9pY3fBUhGBHefXa4aPEut3SDRbC^qpfNP4G3HFvXt0gG0Ogv_i304YDIypd3IXi9oxvAxNnoP4Vc2zis^EuDIAAZN",
        "splunkd_uri": "https://127.0.0.1:8089",
        "splunk_version": "8.2.1",
        "search": "search%20index%3Dbeetles%20%7C%20sortages%20%20%7C%20table%20name%2C%20age%20%7C%20head%20100%20%7C%20export%20add_timestamp%3Df%20add_offset%3Dt%20segmentation%3Draw",
        "command": "sortages",
        "maxresultrows": 50000,
        "earliest_time": "0",
        "latest_time": "0"
    }
}
```