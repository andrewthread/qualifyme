# qualifyme
Uses geolocation to see if a user qualifies for membership to a credit union based on current location.

This is an example of how the script can be imported into your website with an iframe.  
You can put your option tags on the end of the url.  Iframe should be fully responsive to
resizing and browser windows.

**Parameters: aa**
Name: admistrative area
Type: filter
Value: state ie 'IL' (Optional field)

**Parameters: country**
Name: country
Type: filter
Value: country ie 'US' (Optional field)

**Parameters: county**
Name: county
Value: county name ie 'LaSalle County' (Must match format '[county name] County')

**Parameters: township**
Name: township
Value: township name ie 'South Ottawa Township' (Must match format '[township name] Township')

**Parameters: city**
Name: city
Value: full city name (Must match format '[city name]')

**Parameters: phone**
Name: phone number
Value: any value is allowed
Notes: The credit union's phone number

Examples:
One County

	https://cualify.org/?aa=IL&county=Livingston County&phone=815-555-1000


Multiple Counties

	https://cualify.org/?aa=IL&county=Livingston County,LaSalle County&phone=815-555-1000


One Township

	https://cualify.org/?aa=IL&township=Bruce Township&phone=815-555-1000


Multiple Townships

	https://cualify.org/?aa=IL&township=Bruce Township,South Ottawa Township&phone=815-555-1000


One City

	https://cualify.org/?aa=IL&city=Streator&phone=815-555-1000


Multiple Cities

	https://cualify.org/?aa=IL&city=Pontiac,Streator&phone=815-555-1000


**Completed Example**

Below is the code that you would import into your website.

	<iframe src="https://cualify.org/?aa=IL&county=Some%20County&phone=1234" width="100%" height="100%"frameborder="0" style="border:0" />