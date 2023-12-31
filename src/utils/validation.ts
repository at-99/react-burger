const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
function mailCheck(value: string) {
	return EMAIL_REGEXP.test(value);
}

export const isEmailValid =(email: string)=>{
	if (mailCheck(email)) {
		return true
	} else {
		return false
	}
}