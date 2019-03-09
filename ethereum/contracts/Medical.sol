pragma solidity ^0.4.25;

contract Medical{
    
    struct Meeting {
        string diseases;
        uint expense;
        string medicineName;
        bool IsDelegatedPatient;
    }
    
    struct PatientRecord {
        bytes32 patientId;
        string patientFullName;
        uint256 aadharCardNumber;
        bool IsPatient;
        uint256 passCode;
        mapping (address => bool) IsDelegatedPatient;
        mapping (address => mapping(bytes32 => Meeting)) doctorMeeting;
        
    }
    mapping (address => PatientRecord) public patientList;
    
    struct DoctorRecord {
        bytes32 doctorId;
        string doctorFullName;
        uint256 aadharCardNumber;
        bool IsDoctor;
    }
    mapping (address => DoctorRecord) public doctorList;
    
    address Owner;
    constructor() public payable {
        Owner = msg.sender;
    }
    
    
    function AddNewPatient() public returns(string memory) {
        require(!patientList[msg.sender].IsPatient);
        patientList[msg.sender].IsPatient = true;
        patientList[msg.sender].patientFullName = "sunny";
        patientList[msg.sender].aadharCardNumber = 11222;
        patientList[msg.sender].passCode = 1234;
        patientList[msg.sender].patientId = bytes32(keccak256(abi.encodePacked(msg.sender,now)));
        return "New Patient Created";
    } 
    
    function AddNewDoctor() public returns(string memory) {
        require(!doctorList[msg.sender].IsDoctor);
        doctorList[msg.sender].IsDoctor = true;
        doctorList[msg.sender].doctorFullName = "doctor name";
        doctorList[msg.sender].aadharCardNumber = 222222;
        doctorList[msg.sender].doctorId = bytes32(keccak256(abi.encodePacked(msg.sender,now)));
        return "New Doctor Created";
    }
    
    function delegatePatient(address _doctorAddress, uint256 _passCode) public payable returns(string memory){
        require(!doctorList[_doctorAddress].IsDoctor);
        require(!patientList[msg.sender].IsPatient);
        require(patientList[msg.sender].passCode == _passCode);
        //bytes32 id = patientList[msg.sender].patientId;
        require(!patientList[msg.sender].IsDelegatedPatient[_doctorAddress]);
        patientList[msg.sender].IsDelegatedPatient[_doctorAddress] = true;
        return "Patient is delegated";
    }
    
    //New Meeting
    function AddPatientMeetingInfo(address _patientAddress) public returns(string memory){
        require(doctorList[msg.sender].IsDoctor);
        require(patientList[_patientAddress].IsDelegatedPatient[msg.sender]);
        bytes32 meetingId = bytes32(keccak256(abi.encodePacked(msg.sender,_patientAddress,now)));
        patientList[_patientAddress].doctorMeeting[msg.sender][meetingId].diseases = "fever";
        patientList[_patientAddress].doctorMeeting[msg.sender][meetingId].expense = 100;
        patientList[_patientAddress].doctorMeeting[msg.sender][meetingId].medicineName = "lemolate";
        return "Added Meeting Info";
    }
    
    // OLD meeting update
    function AddPatientOldMeetingInfo(address _patientAddress, bytes32 _oldMeetingId) public returns(string memory){
        require(doctorList[msg.sender].IsDoctor);
        require(patientList[_patientAddress].IsDelegatedPatient[msg.sender]);
        patientList[_patientAddress].doctorMeeting[msg.sender][_oldMeetingId].diseases = "fever";
        patientList[_patientAddress].doctorMeeting[msg.sender][_oldMeetingId].expense = 100;
        patientList[_patientAddress].doctorMeeting[msg.sender][_oldMeetingId].medicineName = "lemolate";
        return "Added Meeting Info";
    }
    
    
}