---
title: "RLinf_RDT — Title Placeholder"
permalink: /projects/rlinf-rdt/
project_id: rlinf-rdt
---

{% include project_header.html %}

## TL;DR
- **Problem:** Online RL fine-tuning (e.g., PPO) typically requires action log-probabilities, but diffusion policies like RDT generate actions via iterative denoising and do not naturally expose tractable log-probs.
- **Method:** Integrated **Robotics Diffusion Transformer (RDT)** into **RLinf** by wrapping DDPM sampling as an RLinf policy, aligning observation interfaces (including joint proprioception), and implementing LIBERO action extraction + evaluation scripts.
- **Result:** **Checkpoint-based evaluation / rollout (behavior cloning style) is working** on LIBERO. **RL training is in progress**, with the main remaining challenge being diffusion log-probability estimation for PPO-style policy gradients.

## Overview
This project integrates a **diffusion-based robot manipulation policy** (RDT) into the **RLinf** reinforcement learning framework. The goal is to make it possible to start from a pretrained / fine-tuned RDT checkpoint and eventually perform **online RL fine-tuning** in simulation.

The integration is intentionally staged:
- ✅ Make RDT runnable as an RLinf agent and evaluate rollouts with pretrained checkpoints.
- ⏳ Add RL training support (e.g., PPO), which requires a principled way to compute or approximate action log-probabilities for diffusion sampling.

## What I Implemented
### 1) RDT policy wrapper inside RLinf
- Implemented an RLinf policy class that performs **DDPM denoising** to generate an **action chunk** (e.g., 64-step chunk) and returns actions for environment execution.
- Followed the `diffusers.DDPMScheduler` interface to keep sampling behavior consistent and debuggable.
- Implemented posterior mean/variance computation and kept the denoising chain for potential log-prob estimation.

Key file:
- `rlinf/models/embodiment/rdt/rdt_action_model_withlogprob.py`

### 2) Observation interface alignment (LIBERO env + RLinf I/O)
RDT requires joint proprioception (arm joints + gripper), while the default LIBERO interface often exposes end-effector pose rather than full joint state.

- Extended LIBERO environment wrapper to extract and provide:
  - 7-DoF arm joint positions
  - 2-DoF gripper joint positions
- Extended RLinf I/O structures to pass joint states from env → workers in distributed rollouts.

Key files:
- `rlinf/envs/libero/libero_env.py`
- `rlinf/data/io_struct.py`

### 3) Action-space mapping (RDT unified action → LIBERO action)
RDT produces actions in a unified high-dimensional space and outputs an action chunk, while LIBERO expects a lower-dimensional incremental control command.

- Implemented a deterministic extraction mapping (EEF delta + gripper) from RDT’s unified action vector.
- Added clamping to ensure actions stay within valid control ranges.

### 4) Practical engineering fixes for reproducibility
- Fixed a 180° image rotation mismatch between LeRobot-formatted datasets and LIBERO simulation observations during preprocessing.
- Handled a `diffusers` PEFT version check issue by disabling the compatibility check via an environment variable (script-level fix).

## Current Status
### ✅ Working: evaluation with pretrained/fine-tuned checkpoints
The evaluation scripts can load an RDT checkpoint and run rollouts on LIBERO suites through RLinf’s runner. This provides a consistent way to benchmark and debug the integrated agent.

### ⏳ In progress: RL fine-tuning (PPO)
The main blocker is **log-probability computation**:
- PPO-style methods require `log π(a|s)`.
- Diffusion policies generate actions through iterative denoising; computing exact log-probs is non-trivial.
- The current implementation includes the sampling chain and posterior calculations as building blocks for future log-prob estimation.

## Why this matters for Embodied AI
Many modern manipulation policies are diffusion-based, but most RL systems assume policies provide tractable log-probabilities. This project explores how to bridge that mismatch:
- making diffusion policies runnable in an RL framework,
- identifying the exact algorithmic bottleneck (log-prob),
- and building the infrastructure needed for future online fine-tuning experiments.
