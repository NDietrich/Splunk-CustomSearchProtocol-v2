# Example messgaes passed between Splunk and the 'averageage' custom search command.

The command that was run:
```
index=beetles | averageage
```


## Initial GETINFO message from Splunk:
```
chunked 1.0,726,0
{"action":"getinfo","preview":false,"streaming_command_will_restart":false,"searchinfo":{"args":[],"raw_args":[],"dispatch_dir":"C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629787541.119","sid":"1629787541.119","app":"CustomSearchCommandExamples","owner":"admin","username":"admin","session_key":"CwWqDL_OfxTMmhP5mxtue5_qPKRBy3BGmr4g5gaAfUx6gTTncw7aChvTmvhp1wJCVmXrV1JQFSIMU3IncqP3B84vbugRbojOE45GJ2p_Dq7WwS8O0YVVHNOv","splunkd_uri":"https://127.0.0.1:8089","splunk_version":"8.2.1","search":"search%20index%3Dbeetles%20%7C%20averageage%20%7C%20head%20100%20%7C%20export%20add_timestamp%3Df%20add_offset%3Dt%20segmentation%3Draw","command":"averageage","maxresultrows":50000,"earliest_time":"0","latest_time":"0"}}
```
(note, the json is displayed at the bottom of this page in easier to read format)


## Initial GETINFO reply back to Splunk
```
chunked 1.0,46,0
{"type":"reporting","required_fields":["age"]}
```

## EXECUTE message from Splunk
```
chunked 1.0,36,35
{"action":"execute","finished":true}age,"__mv_age"
66,
18,
25,
96,
52,
```

## EXECUTE reply message to Splunk with modified data
```
chunked 1.0,17,13
{"finished":true}average
51.4
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
        "dispatch_dir": "C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629787541.119",
        "sid": "1629787541.119",
        "app": "CustomSearchCommandExamples",
        "owner": "admin",
        "username": "admin",
        "session_key": "CwWqDL_OfxTMmhP5mxtue5_qPKRBy3BGmr4g5gaAfUx6gTTncw7aChvTmvhp1wJCVmXrV1JQFSIMU3IncqP3B84vbugRbojOE45GJ2p_Dq7WwS8O0YVVHNOv",
        "splunkd_uri": "https://127.0.0.1:8089",
        "splunk_version": "8.2.1",
        "search": "search%20index%3Dbeetles%20%7C%20averageage%20%7C%20head%20100%20%7C%20export%20add_timestamp%3Df%20add_offset%3Dt%20segmentation%3Draw",
        "command": "averageage",
        "maxresultrows": 50000,
        "earliest_time": "0",
        "latest_time": "0"
    }
}
```