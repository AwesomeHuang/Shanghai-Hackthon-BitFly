pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;



contract SimpleStore {
    struct Participant{
        address participantAddress;
        uint256 participantDeposit;
        uint256 vote;
    }
    struct AFlag{
        string Atitle;
        uint256 AparticipantNumber;
        uint256 AdepositTotal;
        uint256 Addl;
    }
    mapping (address => mapping (uint256 => string)) private titles;
    mapping (address => mapping (uint256 => string)) private descriptions;
    mapping (address => mapping (uint256 => string)) private proofs;
    mapping (address => mapping (uint256 => uint256)) private deposits;
    mapping (address => mapping (uint256 => uint256)) private depositsAdd;
    mapping (address => mapping (uint256 => uint256)) private ddls;
    mapping (address => mapping (uint256 => uint256)) private participantNumber;
    mapping (uint256 => mapping (address => uint256)) private committeeResult;
    mapping (uint256 => Participant[]) private participants;
    mapping (uint256 => uint256[]) private committees;
    mapping (address => uint256[]) private categories;
    mapping (uint256 => address[]) private findAddress;
    uint256[] private totalTimeList;
    uint256[] totalVoteValue;
    
    //event Recorded(address _sender, string indexed _title, string indexed _description, string indexed _proof, uint256 indexed _deposit, uint256 indexed _ddl, uint256[] indexed _participant, uint256 indexed _time);
    
    function _addToList(address from, uint256 time) private {
        categories[from].push(time);
        totalTimeList.push(time);
    }
    
    function committeeChoose(uint256 time) public{
        uint randNonce = 0;
        while(randNonce<uint256(participantNumber[getAddress(time)][time])/3){
            committees[time].push(randNonce);
            randNonce=randNonce+1;
        }
    }
    
    function getCommittes(uint256 time) public view returns (uint256[])
    {
        return committees[time];
    }
    
    function vote(uint256 time, uint256 yesorno) public{
        totalVoteValue[time]=totalVoteValue[time]+1;
        committeeResult[time][msg.sender]=yesorno;
    }
    
    function getFinalResult(uint256 time) public view returns(uint256){
        if(totalVoteValue[time]<uint256(participantNumber[getAddress(time)][time])/6){
            return 1;
        }
        else{
            return 0;
        }
    }
    
    function getReward(uint256 time) public view returns(uint256){
        if(committeeResult[time][msg.sender]==getFinalResult(time)){
            return getParticipantDeposit(time,0);
        }
        else{
            return 0;
        }
    }
    
    function getList() public view returns (uint256[])
    {
        return categories[msg.sender];
    }
    
    function getTotalList() public view returns (uint256[])
    {
        return totalTimeList;
    }
    
    function addFlag(string title, string description, string proof, uint256 deposit, uint256 ddl, uint256 time) public payable{
        titles[msg.sender][time]=title;
        descriptions[msg.sender][time]=description;
        proofs[msg.sender][time]=proof;
        deposits[msg.sender][time]=deposit;
        depositsAdd[msg.sender][time]=0;
        ddls[msg.sender][time]=ddl;
        participantNumber[msg.sender][time]=0;
        _addToList(msg.sender, time);
        findAddress[time].push(msg.sender);
        //emit Recorded(msg.sender, title, description, proof, deposit, ddl, participant, time);
    }
    
    function addParticipant(uint256 time, uint256 amount, uint256 yesorno) public payable{
        participants[time].push(Participant(msg.sender,amount,yesorno));
        depositsAdd[getAddress(time)][time]=depositsAdd[getAddress(time)][time]+amount;
        participantNumber[msg.sender][time]=participantNumber[msg.sender][time]+1;
    }
    function getParticipantNumber(uint256 time) public view returns (uint256)
    {
        return participantNumber[msg.sender][time];
    }
    function getParticipantAddress(uint256 time, uint256 order) public view returns (address)
    {
        return participants[time][order].participantAddress;
    }
    
    function getParticipantDeposit(uint256 time, uint256 order) public view returns (uint256)
    {
        return participants[time][order].participantDeposit;
    }
    
    function getTitle(uint256 time) public view returns(string) {
        
        return titles[msg.sender][time];
    }
    
    function getDescription(uint256 time) public view returns(string) {
        
        return descriptions[msg.sender][time];
    }
    function getProof(uint256 time) public view returns(string) {
        
        return proofs[msg.sender][time];
    }
    function getDeposit(uint256 time) public view returns(uint256) {
        
        return deposits[msg.sender][time];
    }
    function getDepositAdd(uint256 time) public view returns (uint256)
    {
        return depositsAdd[msg.sender][time];
    }
    function getDepositTotal(uint256 time) public view returns (uint256)
    {
        return (deposits[msg.sender][time]+depositsAdd[msg.sender][time]);
    }
    function getDdl(uint256 time) public view returns(uint256) {
        
        return ddls[msg.sender][time];
    }
    function getAddress(uint256 time) public view returns (address)
    {
        return findAddress[time][0];
    }
    function getAFlag(uint256 time) public view returns (AFlag)
    {
        return AFlag(getTitle(time),getParticipantNumber(time),getDepositTotal(time),getDdl(time));
    }
    
}