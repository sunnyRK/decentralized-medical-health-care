pragma solidity ^0.4.23;

contract Medical{
    
    struct Meeting {
        string diseases;
        uint expense;
        string medicineName;
        string IpReportHash;
        bytes32 meetingID;
        bool IsDelegatedPatient;
        address patientAddess;
        address doctorAddress;
    }
    
    Meeting[] public meeting;
    
    struct PatientRecord {
        bytes32 patientId;
        string patientFullName;
        uint aadharCardNumber;
        bool IsPatient;
        uint passCode;
        mapping (address => bool) IsDelegatedPatient;
        bytes32[] meetingIdArray;
    }
    
    mapping (address => PatientRecord) public patientList;
    address[] public patientaddressArray;
    
    struct DoctorRecord {
        bytes32 doctorId;
        string doctorFullName;
        uint aadharCardNumber;
        bool IsDoctor;
        mapping (address => bool) IsDelegatedPatient;
    }
    address[] public doctoraddressArray;
    mapping (address => DoctorRecord) public doctorList;
    
    address Owner;
    constructor() public payable {
      Owner = msg.sender;
    }
    
    function PatientIsDelegate(address _doctorAddress, address _patientAddress) public view returns(bool){
        return doctorList[_doctorAddress].IsDelegatedPatient[_patientAddress];
    }
    
    function getDoctorList(address _doctoraddress, address _patientAddress) public view returns(bytes32,string,uint,bool){
        return(
            doctorList[_doctoraddress].doctorId,
            doctorList[_doctoraddress].doctorFullName,
            doctorList[_doctoraddress].aadharCardNumber,
            doctorList[_doctoraddress].IsDelegatedPatient[_patientAddress]
        );
    }
    
    function geDoctorAddress(uint _index) public view returns(address){
        return doctoraddressArray[_index];
    }
    
    function getDoctorAddressArray() public view returns(address[]){
        return doctoraddressArray;
    }
    
    function getPatientAddress(uint _index) public view returns(address){
        return patientaddressArray[_index];
    }
    
    function getPatientAddressArray() public view returns(address[]){
        return patientaddressArray;
    }
    
    // return Info
    function getPatientInfo(address _address) public view returns(
        bytes32,string,uint,bool,uint,bool,uint
        ) {
        return (
            patientList[_address].patientId,
            patientList[_address].patientFullName,
            patientList[_address].aadharCardNumber,
            patientList[_address].IsPatient,
            patientList[_address].passCode,
            patientList[_address].IsDelegatedPatient[msg.sender],
            patientList[_address].meetingIdArray.length
        ); 
    }
    
    function getPatientCount() public view returns (uint) {
        return patientaddressArray.length;
    }
    
    function getMeetingInfo(uint _index) public view returns(string, string, address,address,uint,bytes32, bool){
        return (
            meeting[_index].diseases,
            meeting[_index].medicineName,
            meeting[_index].patientAddess,
            meeting[_index].doctorAddress,
            meeting[_index].expense,
            meeting[_index].meetingID,
            meeting[_index].IsDelegatedPatient
        );
    }
    
    function getMeetingReportHash(uint index) public view returns(string){
        return meeting[index].IpReportHash;
    }
    
    function getUserIsDoctor(address _doctorAddress) public view returns(bool){
        return doctorList[_doctorAddress].IsDoctor;
    }
    
    function getUserIsPatient(address _patientAddress) public view returns(bool){
        return patientList[_patientAddress].IsPatient;
    }
    
    function getMeetingCount() public view returns(uint){
        return meeting.length;
    }

    function getMeetingsIds(address _patientAddress) public view returns(bytes32[]){
        return patientList[_patientAddress].meetingIdArray;
    }
    
    function AddNewPatient() public returns(string memory) {
        require(!patientList[msg.sender].IsPatient);
        patientList[msg.sender].IsPatient = true;
        patientList[msg.sender].patientFullName = "Sunny Radadiya";
        patientList[msg.sender].aadharCardNumber = 111100002222;
        patientList[msg.sender].passCode = 1234;
        patientList[msg.sender].patientId = bytes32(keccak256(msg.sender,now));
        patientaddressArray.push(msg.sender);
        return "New Patient Created";
    } 
    
   function AddNewDoctor() public returns(string memory) {
        require(!doctorList[msg.sender].IsDoctor);
        doctorList[msg.sender].IsDoctor = true;
        doctorList[msg.sender].doctorFullName = "Mr. Rutviz Vyas";
        doctorList[msg.sender].aadharCardNumber = 222298981234;
        doctorList[msg.sender].doctorId = bytes32(keccak256(msg.sender,now));
        doctoraddressArray.push(msg.sender);
        return "New Doctor Created";
    }
    
    function delegatePatient(address _doctorAddress, uint _passCode) public payable returns(string memory){
        require(doctorList[_doctorAddress].IsDoctor);
        require(patientList[msg.sender].IsPatient);
        require(patientList[msg.sender].passCode == _passCode);
        require(!patientList[msg.sender].IsDelegatedPatient[_doctorAddress]);
        patientList[msg.sender].IsDelegatedPatient[_doctorAddress] = true;
        doctorList[_doctorAddress].IsDelegatedPatient[msg.sender] = true;
        return "Patient is delegated";
    }
    
    function RevokedelegatePatient(address _doctorAddress, uint _passCode) public payable returns(string memory){
        require(doctorList[_doctorAddress].IsDoctor);
        require(patientList[msg.sender].IsPatient);
        require(patientList[msg.sender].passCode == _passCode);
        require(patientList[msg.sender].IsDelegatedPatient[_doctorAddress]);
        patientList[msg.sender].IsDelegatedPatient[_doctorAddress] = false;
        doctorList[_doctorAddress].IsDelegatedPatient[msg.sender] = false;
        return "Revoked";
    }
    
    //New Meeting
    function AddPatientMeetingInfo(address _patientAddress, string _diseases, uint _expense, string _medicineName, string _IpReportHash) public returns(string memory){
        require(doctorList[msg.sender].IsDoctor);
        require(patientList[_patientAddress].IsDelegatedPatient[msg.sender]);
        bytes32 meetingId = bytes32(keccak256(msg.sender,_patientAddress,now));
        
        Meeting memory newMeeting = Meeting({
            diseases: _diseases,
            expense: _expense,
            medicineName: _medicineName,
            IpReportHash: _IpReportHash,
            meetingID: meetingId,
            IsDelegatedPatient: true,
            patientAddess: _patientAddress,
            doctorAddress: msg.sender
        });
        meeting.push(newMeeting);
        patientList[_patientAddress].meetingIdArray.push(meetingId);
        return "Added Meeting Info";
    }
}