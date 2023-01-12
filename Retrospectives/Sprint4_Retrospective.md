RETROSPECTIVE Sprint 4 (Team 3)
=====================================

- [Process measures](#process-measures)
- [Quality measures](#quality-measures)
- [General assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done: 3 vs 3
- Total points committed vs. done: 10 vs 10
- Nr of hours planned vs. spent (as a team): 75h50m vs 74h15m


### Detailed statistics

| Story                                     | # Tasks | Points | Hours est. | Hours actual |
| ----------------------------------------- | ------- | ------ | ---------- | ------------ |
| _#0_                                      | 5       |        | 7h30m      | 7h30m        |
| Sonarcloud                                | 1       |        | 4h         | 4h10m        |
| Documentation                             | 2       |        | 6h         | 5h40m        |
| Responsivity Checks & Fixes (Technical Debt)| 1       |        | 3h         | 3h           |
| Stories Frontend Testing (Technical Debt) | 4       |        | 12h        | 12h          |
| Addition of Pictures (Technical Debt)     | 3       |        | 7h         | 9h10m        |
| Populating Database (Technical Debt)      | 1       |        | 2h         | 1h40m        |
| HT-2 (Technical Debt)                     | 3       |        | 4h30m      | 4h35m        |
| HT-7 (Technical Debt)                     | 2       |        | 2h         | 2h           |
| HT-10 (Technical Debt)                    | 1       |        | 1h30m      | 1h30m        |
| HT-33 (Technical Debt)                    | 2       |        | 1h20m      | 1h30m        |
| HT-17                                     | 5       | 5      | 10h        | 8h           |
| HT-18                                     | 4       | 2      | 8h         | 6h           |
| HT-34                                     | 3       | 3      | 7h         | 7h30m        |
| Total                                     | 37      | 10     | 75h50m     | 74h15m       |

- Hours per task average : 2h
- standard deviation for tasks: 
    - Estimated : 54m
    - Real : 1h12m
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
    - 75h50m / 74h15m - 1 = 0,021

  
## QUALITY MEASURES 

- **Unit Testing:**
  - Total hours estimated: 9h
  - Total hours spent: 9h
  - Nr of automated unit test cases: 
      - Previous : (dao:41 + api:43) total
      - New : (dao:56 + api:61) total
  - Coverage (if available)
- **E2E testing:**
  - Total hours estimated: 6h
  - Total hours spent: 6h
  - Nr of automated E2E test: 58
- **Code review** 
  - Total hours estimated: 8h
  - Total hours spent: 9h
- **Technical Debt management** 
  - Total hours estimated: 33h20m
  - Total hours spent: 36h25m
  - Hours estimated for remediation by SonarQube: 4d7h
  - Hours estimated for remediation by SonarQube only for the selected and planned issues: 5h
  - Hours spent on remediation: 4h10m
  - Debt ratio: 0.7%
  - Reliability: A (0 bugs) 
  - Security: A (0 vulnerailities)
  - Maintainability: A (425 code smells)
  


## ASSESSMENT

- **What caused your errors in estimation (if any)?**
    
    - We have underestimated some tasks, for example the mandatory addition of pictures to huts and hikes. We originally planned 4h, but we spent 6h10m because the new pagination system required us to accomodate the change in different places. However, in the end our overestimations and underestimations balanced each other nicely, and the overall Spent Time is really close to our Initial Estimation.
    

- **What lessons did you learn (both positive and negative) in this sprint?**

    *Positive* : 
    - We have done more scrum meetings than past sprints, which had a noticeable impact on the feel of control and final result. 
    - Committing to less stories shifted the focus on quality and felt more sustainable.
    
    *Negative* : 
    - Unfortunately, none of us had read the comments on one telegram message. This caused us to miss a mandatory feature (showing timestamps & allowing to edit the start time for hike).
    
- **Which improvement goals set in the previous retrospective were you able to achieve?**
    - We definitely improved the communication.
    - We were able to automate front end testing.
    - We were able to document our APIs up to the previous sprint.
  
- **Which ones you were not able to achieve? Why?**
    - We were not able to achieve Zero Default because, among other things, we did not read every comments for the selected user stories. However, the issues found were not as critical as in the last demo. Overall, since we spent a lot of time on Technical debt this sprint, everything is cleaner and most functionnalities are tested (frontend and backend).
    
- **Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)**
    - Keeping in contact with the product owner is crucial, we plan to improve that, in order to make sure we do not miss a required feature.
    - Continue Aiming for Zero Default in the implemented User Stories.

- **One thing you are proud of as a Team!!**
    - For this sprint, we decided to commit to less stories that usual, namely 3. This choice allowed us to focus a lot more on the overall quality. We were able to automate the front end tests, document all the APIs up to the previous sprint and fix many defects in our code (following sonarCloud). We are satisfied of the submitted result.
