'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

function ShippingPrice(reductionpercent, i ,j){
  var charge =0;
  if(deliveries[i].options.deductibleReduction == true){
     charge = Math.ceil(deliveries[i].volume);
  }


  var volume = deliveries[i].volume * truckers[j].pricePerVolume*(1-(reductionpercent/100));
  var distance = deliveries[i].distance * truckers[j].pricePerKm;
  var shipping_price = distance + volume;
  //shipping_price = shipping_price -((shipping_price * reductionpercent)/100);

  deliveries[i].price= shipping_price+charge;

  var commission = 0.3*shipping_price;
  var insurance = commission/2;
  var treasury = Math.ceil(deliveries[i].distance/500);
  var convargo = commission-(insurance+treasury)+charge;

  deliveries[i].commission.insurance = insurance;
  deliveries[i].commission.treasury = treasury;
  deliveries[i].commission.convargo = convargo;
  for (var k = 0; k < Object.keys(actors).length; k++) {
    if(deliveries[i].id == actors[k].deliveryId){
      actors[k].payment[0].amount = shipping_price + charge;
      actors[k].payment[1].amount = shipping_price-commission;
      actors[k].payment[2].amount = insurance;
      actors[k].payment[3].amount = treasury;
      actors[k].payment[4].amount = convargo;
    }
  }
}


function DecreasingPrice(i,j){
  for (var i = 0; i < Object.keys(deliveries).length; i++) {
    for (var j = 0; j < Object.keys(truckers).length; j++) {
      if(deliveries[i].truckerId==truckers[j].id){
        if(deliveries[i].volume<5){
          ShippingPrice(0, i,j);
        }

        else if(deliveries[i].volume<10){
          ShippingPrice(10, i,j);
        }

        else if(deliveries[i].volume<25){
          ShippingPrice(30,i,j);
        }
        
        else {
          ShippingPrice(50,i,j);
        }
      }
    }
  }
}

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  },{
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

DecreasingPrice();
console.log(truckers);
console.log(deliveries);
console.log(actors);
