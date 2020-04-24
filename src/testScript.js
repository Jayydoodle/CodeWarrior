if(this.warriorTurn) 
{
  if(this.turn % 2 == 0)
      this.cast("fire", "random");
  else
      this.attack("random");
}
if(this.mageTurn)
{
  if(this.turn % 2 == 0)
      this.cast("cure", "warrior");
  else if (this.turn % 3 == 0)
      this.cast("earth", "random")
  else
      this.cast("ice", "random");
}
if(this.rangerTurn)
{
  if(this.turn % 2 == 0)
    this.cast("water", "random");
  else
    this.limitBurst("tempest");
}

if(this.warriorTurn) 
{
  this.limitBurst("inferno");
}
if(this.mageTurn)
{
  this.limitBurst("discharge");
}
if(this.rangerTurn)
{
  this.limitBurst("tempest");
}

if(this.warriorTurn)
    this.attack("random");
if(this.mageTurn)
    this.cast("fire", "random");
if(this.rangerTurn)
    this.attack("random");
