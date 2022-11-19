RETROSPECTIVE (Team 3)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done: 4 vs 2 
- Total points committed vs. done: 28 vs 13
- Nr of hours planned vs. spent (as a team): 65h vs 71h50m


### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| _#0_   |    9    |        |   36h30m   |     30h50m   |
| n1     |    5    |    8   |     10h    |     7h30m    |
| n2     |    3    |    2   |   12h30m   |      15h     |
| n3     |    4    |    5   |     7h     |     11h30m   |
| n4     |    2    |   13   |     5h     |       4h     |
   

- Hours per task average, standard deviation (estimate and actual):
    - Estimated time: 71h for 23 tasks, 185 minutes (3h 5m) per task on average
    - Actual time spent: 68h 50m for 23 tasks, 180 minutes (3h) per task on average
    - Standard deviation for estimated time: 966.74
    - Standard deviation for actual time spent: 903.80
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1 = 71h 50m / 65h 23m - 1 = 1.099 - 1 = 0.099


  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 3h
  - Total hours spent: 3h30m
  - Nr of automated unit test cases: 10
  - Coverage (if available): 100%
- E2E testing:
  - Total hours estimated: 0
  - Total hours spent: 0
- Code review 
  - Total hours estimated: 6h
  - Total hours spent:4h
  


## ASSESSMENT

- What caused your errors in estimation (if any)? 

A first issue that caused us to underestimate was the need to set the general structure of the application software. Since we referred to a previous project carried out by one of the members of the team, the others had to take a moment to understand the chosen structure, in order to be able to follow a coherent workflow.
Secondly, we had some initial misunderstandings of some of the requests, which we solved by asking the product owner.


- What lessons did you learn (both positive and negative) in this sprint?
    - We proceeded by subdividing the User Stories’ tasks in back-end, front-end and testing, which turned out to be an effective strategy, although, in order for it to work at its best, requires a clear definition of the parameters exchanged by the two ends. We defined them as we worked, which is a somewhat viable option, but in the future we will make sure that the two ends have agreed on them before working, which will allow the members working on their respective ends to have a clear idea of how their code will interact with the other end. We also found that, as we had planned to do at the end of the last sprint, having a clear definition of data structures as soon as possible helps massively with the development, since it gives us a clear idea of the specific data structures that we need to work with. We relied on pair-programming, which we found to be an effective tool when a team member has experience with a given task or technology (e.g. someone who already used Jest for testing), as they can help the other learn more and faster.

- Which improvement goals set in the previous retrospective were you able to achieve? 

  
- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)
    - Trying a different distribution of tasks based on couples (one doing the front-end, one for the back-end). Each couple will take care of a number of stories and divide them into tasks.
  - Make sure to have well understood the stories by asking sufficient questions to the product owner. 
  - Improving the branch-merging process on github, because up to now one person was in charge of merging every branch.
  - The difference between estimated time and spent time is too large! Key factor for the success of the team is to improve the estimation.

- One thing you are proud of as a Team!!
    - We're very proud of the communication and we work well when doing pair-programming. 