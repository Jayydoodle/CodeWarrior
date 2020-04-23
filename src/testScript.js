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
}