---
title: "Exoskeleton-Glove Teleoperation for Dexterous Hands"
permalink: /projects/psibot-dexterous-teleop/
project_id: psibot-dexterous-teleop
---

{% include project_header.html %}

## Context

During my **May–August 2026 internship at PsiBot (灵初)**, I worked on exoskeleton-glove teleoperation for multi-DoF dexterous hands. The focus was mapping human finger motion to robot hands with different kinematics and integrating the resulting commands into a robotics software stack.

## My Work

- Developed glove-to-hand retargeting pipelines for **Wuji (20 DoF)** and **DH01 (21 DoF)** dexterous hands.
- Connected ROS2 glove inputs and hand representations to kinematic retargeting, with joint constraints and regularization.
- Integrated RViz visualization and hardware command interfaces, including trajectory smoothing for robot-hand commands.

## Related Prototype: Ego-View Video to Robot Motion

I also worked on a prototype intended to reconstruct hand trajectories from egocentric video and retarget them to a robot for replay. This involved hand trajectory reconstruction, coordinate alignment, and robot motion retargeting.

**Status:** The end-to-end ego-view pipeline was **not completed** by the end of the internship. This work is presented as a prototype, not a completed data-generation or robot-learning system.

The internship implementation is maintained in a private repository.
