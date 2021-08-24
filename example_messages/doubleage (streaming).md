# Example messgaes passed between Splunk and the 'doubleage' custom search command.

The command that was run:
```
index=beetles | doubleage | table name,age
```


## Initial GETINFO message from Splunk:
```
chunked 1.0,700,0
{"action":"getinfo","preview":false,"streaming_command_will_restart":false,"searchinfo":{"args":[],"raw_args":[],"dispatch_dir":"C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629786023.114","sid":"1629786023.114","app":"CustomSearchCommandExamples","owner":"admin","username":"admin","session_key":"f2SGotNver_vQ6Getqnky3JN62uHh1gt28OKqp984L9BR9tRemjJgGLvRzwNjJyFU4FWq6VxY9eLbpL2mcXiX7SeJnH6jsc_Artf1fxBMyXlqrSzufE__Ri9","splunkd_uri":"https://127.0.0.1:8089","splunk_version":"8.2.1","search":"litsearch%20index%3Dbeetles%20%7C%20doubleage%20%20%7C%20fields%20%20keepcolorder%3Dt%20%22age%22%20%22name%22","command":"doubleage","maxresultrows":50000,"earliest_time":"0","latest_time":"0"}}`
```
(note, the json is displayed at the bottom of this page in easier to read format)


## Initial GETINFO reply back to Splunk
```
chunked 1.0,46,0
{"type":"streaming","required_fields":["age"]}
```

## EXECUTE message from Splunk
```
chunked 1.0,37,85
{"action":"execute","finished":false}age,"_chunked_idx","__mv_age","__mv__chunked_idx"
66,0,,
18,1,,
25,2,,
96,3,,
52,4,,
```

## EXECUTE reply message to Splunk with modified data
```
chunked 1.0,18,82
{"finished":false}age,_chunked_idx,__mv_age,__mv__chunked_idx
132,0,,
36,1,,
50,2,,
192,3,,
104,4,,
```

## EXECUTE message from Splunk (without data, but finished:true)
```
chunked 1.0,36,50
{"action":"execute","finished":true}age,"_chunked_idx","__mv_age","__mv__chunked_idx"
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
        "dispatch_dir": "C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629786023.114",
        "sid": "1629786023.114",
        "app": "CustomSearchCommandExamples",
        "owner": "admin",
        "username": "admin",
        "session_key": "f2SGotNver_vQ6Getqnky3JN62uHh1gt28OKqp984L9BR9tRemjJgGLvRzwNjJyFU4FWq6VxY9eLbpL2mcXiX7SeJnH6jsc_Artf1fxBMyXlqrSzufE__Ri9",
        "splunkd_uri": "https://127.0.0.1:8089",
        "splunk_version": "8.2.1",
        "search": "litsearch%20index%3Dbeetles%20%7C%20doubleage%20%20%7C%20fields%20%20keepcolorder%3Dt%20%22age%22%20%22name%22",
        "command": "doubleage",
        "maxresultrows": 50000,
        "earliest_time": "0",
        "latest_time": "0"
    }
}

```