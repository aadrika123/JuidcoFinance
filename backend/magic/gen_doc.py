'''
    generates excel sheet (.csv) documenting the APIs from a json file exported from Insomnia
    
'''

import json
import csv
from urllib.parse import urlencode      
import sys   
import os   
from os import path    
           
OUTPUT_PATH = os.path.dirname(os.path.realpath(__file__))
            
def showHelp():
    print('''
          Generates a csv file containing APIs and their descriptions.
          
          Syntax: npm run doc <full path to insomnia_apis.json>
          
          ''')
def main():
    args = sys.argv
    if len(args)<2:
        print("Kindly provide the path to the .json file")
        showHelp()
        return

    if not path.isfile(args[1]):
        print("The file does not exist.")
        return
    
    file_path = args[1]
    items = {}

    environment = {}

    with open (file_path) as f:
        data = json.loads(f.read())
        format_version = data['__export_format']
        
        if format_version == 4:
            resources = data['resources']
            for res in resources:
                
                if res["_type"] == "environment":
                    environment.update(res['data'])
                else:
                    items[res['_id']] = res


    print("Found %d items ..."%len(items))

    base_url = environment['base_url']


    with open(OUTPUT_PATH + "/generated/apis.csv", "w") as f:
        csv_writer = csv.writer(f)
        csv_writer.writerow(["Sub module", "operation", "url", "method", "parameters", "example", "sample payload"])

        for key in items:
            item = items[key]
            type = item['_type']
            if type == "request":
                url = item['url']
                url = url.replace("{{ _.base_url }}", base_url)
                url = url[url.find("/api"):]


                params = {}
                paramstring = ""
                example = ""
                if "parameters" in item:
                    ps = item['parameters']
                    for p in ps:
                        params[p['name']] = p['value']
                        
                    if len(ps)>0:
                        paramstring = ",\n".join(list(params.keys()))
                        example = url + "?" + urlencode(params)
                else:
                    example = url



                if url[-1].isdigit():
                    url = url[:url.rfind("/")] + "/[id]"


                method = item['method']

                payload = item['body']['text'] if 'body' in item and 'text' in item['body'] else ""
                csv_writer.writerow([items[item['parentId']]['name'], item['name'], url, method, paramstring, example, payload])
                
main()

