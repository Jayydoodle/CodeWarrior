if(warriorTurn) 
{
  if(turn % 2 == 0)
      this.cast("fire", "random");
  else
      this.attack("random");
}
if(mageTurn)
{
  if(turn == 2)
      this.cast("cure", "warrior");
  else if (turn % 3 == 0)
      this.cast("earth", "random")
  else
      this.cast("ice", "random");
}
if(rangerTurn)
{
  if(turn )
  this.cast("lightning", "random");
}