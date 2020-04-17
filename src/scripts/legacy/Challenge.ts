export class Challenge{

    protected challengeIndex: number
    public infoText: string;
    public method: Function;

    constructor(challengeIndex: number)
    {
        this.challengeIndex = challengeIndex;
    }
}

export class AssignmentChallenge extends Challenge{

    private randomNumber: number;
    
    constructor(challengeIndex: number)
    {
        super(challengeIndex);
        this.generateChallenge(challengeIndex);
    }
    
    private generateChallenge(index: number)
    {
        this.randomNumber = Math.floor(Math.random() * (200 - 0 + 1) + 0);

        if(this.challengeIndex == 1)
        {
            this.infoText = "Set the variable x to equal " + this.randomNumber;
            this.method = this.assignmentChallenge_1;
        }
    }

    private assignmentChallenge_1(code: any)
    {
        var x = -1;

        try {
            eval(code); 
        } catch (e) {
            
            alert("There is an error with your code, please try again.");
            return;
        }

        if(x == this.randomNumber)
        {
            return true;
        }

        return false;
    }
}