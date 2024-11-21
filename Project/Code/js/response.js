function di() {
    var date = localStorage.getItem('date')
    var pin = localStorage.getItem('pin')
    fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + pin + '&date=' + date)
        .then(res => res.json())
        .then(data => {

            let arr = data['sessions'];
            let tbody = document.getElementById('tbody')
if (arr.length==0) {let html=`<tr id=backupmsg><center>Sorry!! No vaccinations available on the day</center></tr>`
                tbody.innerHTML += html;}
 else {
            Array.from(arr).forEach((element, ind) => {
                var backup;
                var name = arr[ind]['name']
                var address = arr[ind]['address']
                var price = arr[ind]['fee']
                var vacname = arr[ind]['vaccine']
                var maxage = arr[ind]['max_age_limit']
                var minage = arr[ind]['min_age_limit']
                var noofslots = arr[ind]['available_capacity']
                if (maxage == undefined) { maxage = "All Ages" }
                var backup = ""
                if (arr.length == 0) { backup = "Sorry!! No vaccinations available on the day" }

                let html = `<tr>
                <td id="add${ind}">${name + "<br>" + address}</td>
                <td id="pri${ind}">&#8377 ${price}</td>
                <td id="vac${ind}">${vacname}</td>
                <td id="age${ind}">${minage + "-" + maxage}</td>
                <td id="slo${ind}">${noofslots}</td>
                <td>
                    <h6><a href="https://www.cowin.gov.in/" class="btn" target=blank>Book a Slot</a></h6>
                </td>
                </tr>
                <tr>${backup}</tr>
                `

                tbody.innerHTML += html;
            })}

        })
}