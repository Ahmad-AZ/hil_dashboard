import json 
import os 


#Read package.json file to delete the type: mod
package_json_file = "node_modules\@eslint\eslintrc\package.json"

with open(package_json_file, 'r') as file:
    data = json.load(file)

if 'type' in data:
    del data['type']
    print('*****deleting type: module*****')

with open(package_json_file, 'w') as file:
    json.dump(data, file, indent=2)
    print('*****Modified package.json*****')




#Read the package-lock.json file
with open("package-lock.json", "r") as package_lock_file:
    package_lock_lines = package_lock_file.readlines()

#Create a new list without lines containing the first occurrence of "eslint-plugin-flowtype"
found_first_occurrence = False
new_package_lock_lines = []

for line in package_lock_lines:
    if not found_first_occurrence and "eslint-plugin-flowtype" in line:
        found_first_occurrence = True
    else:
        new_package_lock_lines.append(line)



if os.path.exists('package-lock.json'):
    os.remove('package-lock.json')
#Write the modified content back to package-lock.json
with open("package-lock.json", "w") as package_lock_file:
    print("*****created a new package-lock.json*****")
    package_lock_file.writelines(new_package_lock_lines)

