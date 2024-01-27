const clients = {
	'Comlis' :{
		slugURL: 'comlis',
		promptName: 'Comlis', 
		chatMessageColor: '#F8FAFC',
		brandFileName: "/logo-comlis_robot.png",
		url : "https://comlis.io/",
	},
	'Pharm Nature' : {
			slugURL: 'pharmnature',
			promptName: 'Pharm Nature',
			chatMessageColor: '#e6ebfd',
			brandFileName: "/logo-pharm-nature-micronutrition-2021.svg",
			url: "https://pharmnaturemicronutrition.fr/",
	}
}

export const getComlisClient = (profile, slugURL) => {
	
	let effectifClientName
  if (slugURL) {
		effectifClientName = Object.entries(clients).filter(([k,v])=> v.slugURL===slugURL)[0][0] || 'Comlis'
	} else if (profile) {
		effectifClientName = profile.anthropic_api_key
	} else {
		effectifClientName = "Comlis"
	}
	return clients[effectifClientName]
}
