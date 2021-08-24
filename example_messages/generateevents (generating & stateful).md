# Example messgaes passed between Splunk and the 'generateevents' custom search command.

The command that was run:
```
| generateevents
```


## Initial GETINFO message from Splunk:
```
chunked 1.0,709,0
{"action":"getinfo","preview":false,"streaming_command_will_restart":false,"searchinfo":{"args":[],"raw_args":[],"dispatch_dir":"C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629787812.122","sid":"1629787812.122","app":"CustomSearchCommandExamples","owner":"admin","username":"admin","session_key":"JpsitbdlKdI5WMFTHzmPKxNT8vbg^TxEVvknN^u4YcDgqFvdtQGHmkU9sHcXKOO4U2Jm^bWpuwcUGJDfXQLA5FL7AK90oFWxKHdGuepVVP6G1xKCXDVXXWL","splunkd_uri":"https://127.0.0.1:8089","splunk_version":"8.2.1","search":"%7C%20generateevents%20%20%7C%20head%20100%20%7C%20export%20add_timestamp%3Df%20add_offset%3Dt%20segmentation%3Draw","command":"generateevents","maxresultrows":50000,"earliest_time":"0","latest_time":"0"}}
```
(note, the json is displayed at the bottom of this page in easier to read format)


## Initial GETINFO reply back to Splunk
```
chunked 1.0,106,0
{"type":"stateful","required_fields":["_time","data","generated_index","random_number"],"generating":true}
```

## EXECUTE message from Splunk
```
chunked 1.0,36,151
{"action":"execute","finished":true}"_time",data,"generated_index","random_number","_chunked_idx","__mv__time","__mv_data","__mv_generated_index","__mv_random_number","__mv__chunked_idx"
```

## EXECUTE reply message to Splunk with modified data (editied since I don't want to add 1000 lines)
```
chunked 1.0,17,20388
{"finished":true}_time,generated_index,random_number,data,_chunked_idx,__mv__time,__mv__chunked_idx
0,500,-8855,3f8yd,,,
0,0,3803,yu31y,,,
0,2,6553,x1km3,,,
0,3,-9129,63dq5,,,
0,4,6065,mgm0p,,,
0,5,-3777,qlb1f,,,
0,6,6518,jtkcm,,,
0,7,1301,lu18x,,,
...
0,996,-9221,8h0en,,,
0,997,-525,zsxun,,,
0,998,7340,jfn84,,,
0,999,-7320,uyqiw,,,
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
        "dispatch_dir": "C:\\Program Files\\Splunk\\var\\run\\splunk\\dispatch\\1629787812.122",
        "sid": "1629787812.122",
        "app": "CustomSearchCommandExamples",
        "owner": "admin",
        "username": "admin",
        "session_key": "JpsitbdlKdI5WMFTHzmPKxNT8vbg^TxEVvknN^u4YcDgqFvdtQGHmkU9sHcXKOO4U2Jm^bWpuwcUGJDfXQLA5FL7AK90oFWxKHdGuepVVP6G1xKCXDVXXWL",
        "splunkd_uri": "https://127.0.0.1:8089",
        "splunk_version": "8.2.1",
        "search": "%7C%20generateevents%20%20%7C%20head%20100%20%7C%20export%20add_timestamp%3Df%20add_offset%3Dt%20segmentation%3Draw",
        "command": "generateevents",
        "maxresultrows": 50000,
        "earliest_time": "0",
        "latest_time": "0"
    }
}
```