const clients = {
	'Comlis' :{
		promptName: 'Comlis', 
		chatMessageColor: '#F8FAFC',
		brandFileName: "/logo-comlis_robot.png",
		url : "https://comlis.io/",
	},
	'Pharm Nature' : {
			promptName: 'Pharm Nature',
			chatMessageColor: '#e6ebfd',
			brandFileName: "/logo-pharm-nature-micronutrition-2021.svg",
			url: "https://pharmnaturemicronutrition.fr/",
	}
}

export const getComlisClient = (profile) => {
	
  const clientName = profile ? profile.anthropic_api_key : "Comlis"
	return clients[clientName]
}
