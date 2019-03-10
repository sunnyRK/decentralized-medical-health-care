pragma solidity ^0.4.25;

contract Medical{
    
    struct Meeting {
        string diseases;
        uint expense;
        string medicineName;
        bytes32 meetingID;
        bool IsDelegatedPatient;
        address patientAddess;
        address doctorAddress;
    }
    
    Meeting[] public meeting;
    
    // mapping (address => mapping(address => mapping(bytes32 => Meeting))) doctorMeetings;
    
    struct PatientRecord {
        bytes32 patientId;
        string patientFullName;
        uint aadharCardNumber;
        bool IsPatient;
        uint passCode;
        mapping (address => bool) IsDelegatedPatient;
        bytes32[] meetingIdArray;
        // mapping (address => mapping(bytes32 => Meeting)) doctorMeeting;
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
    constructor () public payable {
      Owner = msg.sender;
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
    
    function getPatientCount() public view returns (uint)
    {
        return patientaddressArray.length;
    }
    
    function getMeetingInfo(uint _index) public view returns(   string, string,address,address,uint,bytes32, bool){
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
    
    function getMeetingCount() public view returns(uint){
        return meeting.length;
    }

    function getMeetingsIds(address _patientAddress) public view returns(bytes32[]){
        return patientList[_patientAddress].meetingIdArray;
    }
    
    function AddNewPatient() public returns(string memory) {
        require(!patientList[msg.sender].IsPatient);
        patientList[msg.sender].IsPatient = true;
        patientList[msg.sender].patientFullName = "sunny";
        patientList[msg.sender].aadharCardNumber = 11222;
        patientList[msg.sender].passCode = 1234;
        patientList[msg.sender].patientId = bytes32(keccak256(abi.encodePacked(msg.sender,now)));
        patientaddressArray.push(msg.sender);
        return "New Patient Created";
    } 
    
   function AddNewDoctor() public returns(string memory) {
        require(!doctorList[msg.sender].IsDoctor);
        
        // DoctorRecord memory newDoctor = DoctorRecord({
        //     IsDoctor:true;
        //     doctorFullName:"doctor name",
        //     aadharCardNumber: 222222,
        //     doctorId: bytes32(keccak256(abi.encodePacked(msg.sender,now)))
        // });
        // doctorList.push(newDoctor);
        
        doctorList[msg.sender].IsDoctor = true;
        doctorList[msg.sender].doctorFullName = "doctor name";
        doctorList[msg.sender].aadharCardNumber = 222222;
        doctorList[msg.sender].doctorId = bytes32(keccak256(abi.encodePacked(msg.sender,now)));
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
    function AddPatientMeetingInfo(address _patientAddress) public returns(string memory){
        require(doctorList[msg.sender].IsDoctor);
        require(patientList[_patientAddress].IsDelegatedPatient[msg.sender]);
        bytes32 meetingId = bytes32(keccak256(abi.encodePacked(msg.sender,_patientAddress,now)));
        // patientList[_patientAddress].doctorMeeting[msg.sender][meetingId].diseases = "fever";
        // patientList[_patientAddress].doctorMeeting[msg.sender][meetingId].expense = 100;
        // patientList[_patientAddress].doctorMeeting[msg.sender][meetingId].medicineName = "lemolate";
        // patientList[_patientAddress].doctorMeeting[msg.sender][meetingId].IsDelegatedPatient = true;
        
        Meeting memory newMeeting = Meeting({
            diseases: "fever",
            expense: 100,
            medicineName: "lemolate",
            meetingID: meetingId,
            IsDelegatedPatient: true,
            patientAddess: _patientAddress,
            doctorAddress: msg.sender
        });
        meeting.push(newMeeting);
        
        
        // doctorMeetings[_patientAddress][msg.sender][meetingId].diseases = "fever";
        // doctorMeetings[_patientAddress][msg.sender][meetingId].expense = 100;
        // doctorMeetings[_patientAddress][msg.sender][meetingId].medicineName = "lemolate";
        // doctorMeetings[_patientAddress][msg.sender][meetingId].IsDelegatedPatient = true;
        
        patientList[_patientAddress].meetingIdArray.push(meetingId);
        return "Added Meeting Info";
    }
    
    // OLD meeting update
    // function AddPatientOldMeetingInfo(address _patientAddress, bytes32 _oldMeetingId) public returns(string memory){
    //     require(doctorList[msg.sender].IsDoctor);
    //     require(patientList[_patientAddress].IsDelegatedPatient[msg.sender]);
        
    //      Meeting memory newMeeting = Meeting({
    //         .diseases: "fever",
    //         expense: 100,
    //         medicineName: "lemolate",
    //         meetingID: meetingId
    //     });
    //     patientList[_patientAddress].doctorMeeting[msg.sender].push(newMeeting);
        
    //     // patientList[_patientAddress].doctorMeeting[msg.sender][_oldMeetingId].diseases = "fever";
    //     // patientList[_patientAddress].doctorMeeting[msg.sender][_oldMeetingId].expense = 100;
    //     // patientList[_patientAddress].doctorMeeting[msg.sender][_oldMeetingId].medicineName = "lemolate";
    //     patientList[_patientAddress].meetingIdArray.push(_oldMeetingId);
    //     return "Added Meeting Info";
    // }
}