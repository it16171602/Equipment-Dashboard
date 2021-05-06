

const BASE_URL1 = 'http://ivivaanywhere.ivivacloud.com/api/Asset/Asset/All?apikey=SC:demo:64a9aa122143a5db&max=100&last=0';
const BASE_URL2 = 'http://ivivaanywhere.ivivacloud.com/api/Asset/Asset/All?apikey=SC:demo:64a9aa122143a5db&max=100&last=100';
const BASE_URL3 = 'http://ivivaanywhere.ivivacloud.com/api/Asset/Asset/All?apikey=SC:demo:64a9aa122143a5db&max=100&last=200';

var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };



const getList = async () => {
  try {
    const response1 = await axios.get(BASE_URL1);
    const response2 = await axios.get(BASE_URL2);
    const response3 = await axios.get(BASE_URL3);

    const list1 = response1.data;
    const list2 = response2.data;
    const list3 = response3.data;

    const fullList = list1.concat(list2,list3)

    return fullList;

  } catch (errors) {
    console.error(errors);
  }
};
 
 window.onload = async function () {
     var list = await getList();
     var operationalCount,nonOperationalCount;

     operationalCount = list.filter(r=> r.OperationalStatus == "Operational").length
     nonOperationalCount = list.filter(r=> r.OperationalStatus == "Non-Operational").length
  
     var categoryList = Object.entries(groupBy(list,'AssetCategoryID'))
     
     document.getElementById("op").innerHTML = `Operational ${operationalCount}`
     document.getElementById("nonop").innerHTML = `Non - Operational ${nonOperationalCount}`
  
     var dataPoints = categoryList.map(r=> {return { y: r[1].length, label:r[0]}})

 var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "Equipments"
	},
	axisY: {
		title: "Count"
    },
    axisX: {
		title: "Equipment Type"
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		
		dataPoints: dataPoints
			
	}]
});
chart.render();
}