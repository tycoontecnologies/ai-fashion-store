#!/bin/bash
set -e

FILE=app/checkout/page.tsx

cp $FILE ${FILE}.phase_customer_backup

echo "BACKUP CREATED"

grep -n "const total" $FILE
grep -n "async function placeOrder" $FILE

echo
echo "MANUAL PATCH REQUIRED:"
echo
echo "1. Add states after useCart():"
echo '
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [city,setCity] = useState("");
const [address,setAddress] = useState("");
'
echo
echo "2. Save fields inside saveOrder:"
echo '
customerName:name,
customerEmail:email,
customerPhone:phone,
customerCity:city,
customerAddress:address,
'
echo
echo "3. Add value/onChange to all inputs."
echo
echo "4. Add validation:"
echo '
if(!name || !email || !phone){
 alert("Please complete checkout form");
 return;
}
'
