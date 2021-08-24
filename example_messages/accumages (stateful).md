# Example messgaes passed between Splunk and the 'accumages' custom search command.

The command that was run:
```
index=beetles | accumages | table name, age, accum_age
```


## Initial GETINFO message from Splunk:
```
chunked 1.0,768,0
{"action":"getinfo","preview":false,"streaming_command_will_restart":false,"searchinfo":{"args":[],"raw_args":[],"dispatch_dir":"C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629786722.117","sid":"1629786722.117","app":"CustomSearchCommandExamples","owner":"admin","username":"admin","session_key":"c2ZUuphD9URRgTjrk23kbZ8utvaBKRTcU4x^xrnNumAV7PvEx9PWMZ3FYKh8DyxHyfyGDJmzmxwqb0WPkmX_NHJvne0g5VS_dD0UKlsiXVRnAhcASOfy","splunkd_uri":"https://127.0.0.1:8089","splunk_version":"8.2.1","search":"search%20index%3Dbeetles%20%7C%20accumages%20%20%7C%20table%20name%2C%20age%2C%20accum_age%20%7C%20head%20100%20%7C%20export%20add_timestamp%3Df%20add_offset%3Dt%20segmentation%3Draw","command":"accumages","maxresultrows":50000,"earliest_time":"0","latest_time":"0"}}<<EOF>>
```
(note, the json is displayed at the bottom of this page in easier to read format)


## Initial GETINFO reply back to Splunk
```
chunked 1.0,57,0
{"type":"stateful","required_fields":["age","accum_age"]}<<EOF>>
```

## EXECUTE message from Splunk
```
chunked 1.0,37,124
{"action":"execute","finished":false}age,"accum_age","_chunked_idx","__mv_age","__mv_accum_age","__mv__chunked_idx"
66,,0,,,
18,,1,,,
25,,2,,,
96,,3,,,
52,,4,,,
```



## EXECUTE reply message to Splunk with modified data
```
chunked 1.0,18,127
{"finished":false}age,accum_age,_chunked_idx,__mv_age,__mv_accum_age,__mv__chunked_idx
66,66,0,,,
18,84,1,,,
25,109,2,,,
96,205,3,,,
52,257,4,,,
```


## EXECUTE message from Splunk (without data, splunk does this sometimes)
```
chunked 1.0,37,79
{"action":"execute","finished":false}age,"accum_age","_chunked_idx","__mv_age","__mv_accum_age","__mv__chunked_idx"
```


## EXECUTE reply message to Splunk  (without data)
```
chunked 1.0,18,0
{"finished":false}
```

## EXECUTE message from Splunk (without data, but finished:true)
```
chunked 1.0,36,79
{"action":"execute","finished":true}age,"accum_age","_chunked_idx","__mv_age","__mv_accum_age","__mv__chunked_idx"
```


## EXECUTE reply message to Splunk  (without data, but finished:true)
```
chunked 1.0,17,0
{"finished":true}
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
        "dispatch_dir": "C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629786722.117",
        "sid": "1629786722.117",
        "app": "CustomSearchCommandExamples",
        "owner": "admin",
        "username": "admin",
        "session_key": "c2ZUuphD9URRgTjrk23kbZ8utvaBKRTcU4x^xrnNumAV7PvEx9PWMZ3FYKh8DyxHyfyGDJmzmxwqb0WPkmX_NHJvne0g5VS_dD0UKlsiXVRnAhcASOfy",
        "splunkd_uri": "https://127.0.0.1:8089",
        "splunk_version": "8.2.1",
        "search": "search%20index%3Dbeetles%20%7C%20accumages%20%20%7C%20table%20name%2C%20age%2C%20accum_age%20%7C%20head%20100%20%7C%20export%20add_timestamp%3Df%20add_offset%3Dt%20segmentation%3Draw",
        "command": "accumages",
        "maxresultrows": 50000,
        "earliest_time": "0",
        "latest_time": "0"
    }
}
```