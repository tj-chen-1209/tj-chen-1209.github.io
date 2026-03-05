---
title: "OptiTrack Teleoperation Data Capture"
permalink: /projects/optitrack-teleop/
project_id: optitrack-teleop
---

{% include project_header.html %}

## TL;DR
- **Problem:** Teleoperation and imitation learning often require high-quality end-effector / tool pose trajectories as supervision. OptiTrack Motive provides accurate rigid-body tracking, but it is not natively exposed as standard ROS2 topics/TF for robotics pipelines.
- **Method:** Built a ROS2 module that receives Motive tracking through NatNet and outputs the rigid-body pose as **ROS2 PoseStamped and TF**, then mapped the pose stream into **RViz/MoveIt2** for simulation-side visualization and integration.
- **Result:** Enabled a practical “MoCap → ROS2 → MoveIt2” pipeline that can be recorded (e.g., via rosbag2) and reused as demonstration data for downstream embodied/teleop workflows.

## Overview
This project focuses on **teleoperation demonstration data acquisition**: turning OptiTrack Motive motion-capture tracking into ROS2-native interfaces that are easy to consume, log, and visualize.
Instead of building a full teleop control loop, the core contribution is a reliable pose streaming bridge that provides high-fidelity trajectories as standard ROS2 messages (PoseStamped/TF), which can then be used by downstream systems (e.g., RViz/MoveIt2 visualization, controllers, or dataset pipelines).

## My Contribution
- Implemented a ROS2 (Humble) node in C++ that connects to OptiTrack Motive via the NatNet SDK and converts rigid-body tracking into **PoseStamped** and **TF**.
- Integrated the streamed pose into RViz/MoveIt2 for simulation-side mapping/visual debugging (pose follows the tracked rigid body in the scene).
- Packaged the pipeline for practical use in data collection workflows, where the pose stream can be recorded and replayed as teleop demonstrations (e.g., rosbag2).

## Teleop / Embodied AI Relevance
In many embodied learning settings, a key bottleneck is collecting **clean, time-aligned demonstration trajectories** (especially 6DoF poses) that can serve as supervision for:
- imitation learning / behavior cloning,
- policy debugging with “what the operator intended” signals,
- simulation replay and annotation.

This project provides the “pose acquisition layer” by exposing motion-capture trajectories as ROS2-native data streams (PoseStamped/TF), making it straightforward to log, replay, and integrate with existing robotics stacks.

## System Architecture
**Data flow:**
OptiTrack Motive → NatNet stream → ROS2 node → PoseStamped / TF → RViz / MoveIt2 mapping

- Motive performs rigid-body tracking.
- The node receives tracking frames and publishes:
  - `geometry_msgs/PoseStamped` (for topic-based consumers),
  - TF transforms (for frame-based consumers like RViz/MoveIt2).
- RViz/MoveIt2 subscribes to TF / topics to visualize and align the pose within the robot/simulation scene.

## Technical Notes
- **ROS2:** Humble
- **MoveIt2 / RViz:** visualization + simulation-side mapping
- **Interface:** NatNet SDK (OptiTrack Motive)
- **Outputs:** PoseStamped and TF (for easy integration with standard robotics tools)

