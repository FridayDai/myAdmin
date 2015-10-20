package com.ratchethealth.admin

class Client {
	long id
	String logo
	String favIcon
	String logoFileName
	String favIconFileName
	String name
	String subDomain
	String portalName
	String primaryColorHex
	int activeStaffCount = 0
	int activePatientCount = 0
	int activeTreatmentCount = 0
	Staff clientStaff
}
