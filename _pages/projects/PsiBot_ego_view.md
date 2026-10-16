---
title: "Ego-View Video-to-Robot Pipeline (Prototype)"
permalink: /projects/psibot-ego-view/
project_id: psibot-ego-view
---

{% include project_header.html %}

## Research Motivation

Egocentric video could provide human manipulation examples for robot learning. This project explored a pipeline from a single ego-view RGB video to world-frame hand trajectories, followed by robot-motion retargeting and simulation replay.

## My Work

- Prototyped bimanual hand trajectory reconstruction by combining hand pose estimation, camera tracking, and metric depth.
- Worked on coordinate alignment and retargeting human hand trajectories to robot motion.
- Worked on MuJoCo replay to inspect retargeted motion.

## Status and Scope

This was a **prototype developed during my May–August 2026 PsiBot internship**. The **end-to-end integration remained incomplete** at the end of the internship. It is not presented as a completed robot-learning data pipeline, and no downstream training result is claimed.

The implementation is maintained in a private repository. My related [exoskeleton-glove teleoperation project](/projects/psibot-dexterous-teleop/) is described separately.
