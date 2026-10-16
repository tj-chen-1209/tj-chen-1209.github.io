---
title: "Exoskeleton-Glove Teleoperation for Dexterous Hands"
permalink: /projects/psibot-dexterous-teleop/
project_id: psibot-dexterous-teleop
---

{% include project_header.html %}

## Context

During my **May–August 2026 internship at PsiBot**, I worked on exoskeleton-glove teleoperation for multi-DoF dexterous hands. The focus was mapping human finger motion to robot hands with different kinematics and integrating the resulting commands into a robotics software stack.

## My Work

- Developed glove-to-hand retargeting pipelines for **Wuji (20 DoF)** and **DH01 (21 DoF)** dexterous hands.
- Adapted optimization-based retargeting using **Pinocchio forward kinematics** and **NLopt SLSQP**, with fingertip and pinch objectives, joint constraints, and regularization.
- Connected ROS2 glove inputs to RViz visualization and hardware command interfaces, including **Ruckig trajectory smoothing** and joint-limit handling for robot-hand commands.

<h2 id="demos">Teleoperation Demos</h2>

{% include video_gallery.html group="teleoperation" %}

## Related Prototype: Ego-View Video to Robot Motion

See the separate [ego-view pipeline project](/projects/psibot-ego-view/) for the hand trajectory reconstruction and retargeting prototype. Its end-to-end integration was not completed by the end of the internship.

The internship implementation is maintained in a private repository.
