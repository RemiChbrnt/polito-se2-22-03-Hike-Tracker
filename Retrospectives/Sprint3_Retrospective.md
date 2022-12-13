RETROSPECTIVE Sprint 3 (Team 3)
=====================================

- [Process measures](#process-measures)
- [Quality measures](#quality-measures)
- [General assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done: 10 vs 8
- Total points committed vs. done: 39 vs 33
- Nr of hours planned vs. spent (as a team): 86h30m vs 77h15m


### Detailed statistics

| Story                  | # Tasks | Points | Hours est. | Hours actual |
| ---------------------- | ------- | ------ | ---------- | ------------ |
| _#0_                   | 8       |        | 12h        | 10h30m       |
| HT-1 (Technical Debt)  | 4       |        | 7h10m      | 7h40m        |
| HT-3 (Technical Debt)  | 2       |        | 3h         | 3h           |
| HT-4 (Technical Debt)  | 1       |        | 1h20m      | 1h20m        |
| HT-5 (Technical Debt)  | 1       |        | 30m        | 45m          |
| HT-6 (Technical Debt)  | 1       |        | 30m        | 30m          |
| HT-9 (Technical Debt)  | 1       |        | 1h         | 30m          |
| HT-10 (Technical Debt) | 1       |        | 2h         | 2h           |
| HT-33                  | 5       | 5      | 6h         | 6h           |
| HT-11                  | 4       | 3      | 3h10m      | 1h20m        |
| HT-31                  | 4       | 3      | 2h10m      | 1h10m        |
| HT-32                  | 3       | 3      | 2h20m      | 2h05m        |
| HT-12                  | 5       | 3      | 2h30m      | 2h20m        |
| HT-13                  | 4       | 3      | 2h05m      | 2h20m        |
| HT-14                  | 6       | 5      | 11h        | 9h25m        |
| HT-16                  | 6       | 8      | 8h30m      | 9h35m        |
| HT-15 (Incomplete)     | 5       | 3      | 6h30m      | 5h30m        |
| HT-30 (Incomplete)     | 2       | 3      | 4h         | 2h30m        |
| Total                  | 62      | 39     | 75h45m     | 68h30m       |

- Hours per task average : 1h6m
- standard deviation for tasks: 
    - Estimated : 45m
    - Real : 46m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
    - 75h45m / 68h30m - 1 = 0,104

  
## QUALITY MEASURES 

- **Unit Testing:**
  - Total hours estimated: 15h20m
  - Total hours spent: 13h
  - Nr of automated unit test cases: (dao:41 + api:43) total
  - Coverage (if available)
- **E2E testing:**
  - Total hours estimated: 3h30m
  - Total hours spent: 3h30m
- **Code review** 
  - Total hours estimated: 8h
  - Total hours spent: 9h
  


## ASSESSMENT

- **What caused your errors in estimation (if any)?**

    For this sprint, our estimation was more inline with the work done. However, we still expected the tests to take more time. This is most likely because we have learned how to deal with the testing tools, rendering us more efficient. A few stories took also less time than expected, namely 11 and 14.

- **What lessons did you learn (both positive and negative) in this sprint?**

    *Positive* : 
    - SonarCloud is a useful tool to keep the code clean. Most of us have stated that we will use it for future projects.
    - Fixing technical debt improved a lot the quality of our code, increasing the team morale and pride with respect to the website.
    - We prepared better for the demo (sample data and manual testing), which seemingly led to a smoother presentation.
    
    *Negative* : 
    - Two of us were less available due to personal obligations, thus it was harder for us to organize and to distribute the workload.
    - Probably the harshest lesson comes from GitHub. We had some serious issues with the main branch, caused by incautious pull requests and merges. This led to unnecessary and unplanned work, as well as obvious stress.
    - Lack of communication forced us to adjust the planning mid-sprint, causing us to drop 2 stories. 
    
- **Which improvement goals set in the previous retrospective were you able to achieve?**
    - We were able to reserve the needed time to fix most of the technical debt, as we wanted to do.
    - Our code is much closer to Zero Default than it was in the previous sprint, but is not yet perfect.
  
- **Which ones you were not able to achieve? Why?**
    - We were not able to achieve Zero Default for lack of time, however the issues found were not as critical as in the last demo.
    - We were not able to write documentation because of the lack of personnel.
    
    
- **Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)**

    - Improve the communication amongst the team members, especially outside SCRUM meetings.
    - Aim for Zero Default in the implemented User Stories.
    - Because cypress tests turned out to be flaky, we would like to write some formal documentation about front-end testing.
    - Reserve some time to write the necessary documentation for our code and API.

- **One thing you are proud of as a Team!!**

    - As a team, we are proud of the improvements in the quality of code. It is cleaner with respect to Sonar Cloud, but also easier to use and more complete for the users.
