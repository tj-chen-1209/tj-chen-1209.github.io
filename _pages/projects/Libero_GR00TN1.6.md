---
title: "Libero_GR00TN1.6 — Title Placeholder"
permalink: /projects/libero-grootn1.6/
project_id: libero-grootn1.6
---

{% include project_header.html %}

## TL;DR
- **Problem:** Fine-tuning large vision-language-action (VLA) models on language-conditioned manipulation benchmarks requires careful embodiment mapping, scalable training, and reliable evaluation.
- **Method:** Built an end-to-end fine-tuning pipeline for **NVIDIA GR00T-N1.6 (3B)** on **LIBERO**, using a parameter-efficient strategy (freeze vision + LLM; train projector + diffusion decoder), **DeepSpeed ZeRO-2**, and a config-driven parallel evaluation system with video recording.
- **Result:** Achieved **97.8% average success** (782/800 episodes) across **40 tasks from 4 LIBERO suites**, surpassing the published baseline by **+0.8%** under the same evaluation protocol. Released **4 validated checkpoints** on HuggingFace.

## Overview
This project demonstrates a full workflow to adapt **GR00T-N1.6** (a 3B-parameter vision-language-action model) to **LIBERO** language-conditioned manipulation tasks.  
My focus is not only training, but also building a reproducible system: dataset integration, embodiment modality mapping, scalable training scripts for multiple suites, and a reliable evaluation harness (parallel envs + logging + videos).

## What I Did
### 1) Dataset integration & embodiment mapping
- Integrated LIBERO datasets in **LeRobot v2** format.
- Implemented modality mapping for **Franka Panda** (7-DoF + gripper) so the model can consume observations and output actions in the correct embodiment interface.
- Built a simulation wrapper that supports parallel rollouts for efficient evaluation.

Key artifacts:
- `examples/LIBERO/modality.json` (state/action mapping)
- `gr00t/eval/sim/LIBERO/libero_env.py` (environment wrapper)
- `gr00t/eval/sim/LIBERO/setup_libero.sh` (environment setup)

### 2) Parameter-efficient fine-tuning strategy
To make fine-tuning practical for a 3B model, I adopted a selective training plan:
- **Frozen:** vision encoder (ViT), language model (LLM), and backbone components to preserve pre-trained capabilities.
- **Trained:** multimodal **projector** (fusion/adaptation) and **diffusion decoder (DiT)** to specialize action generation.
- **Trainable parameters:** ~40% (≈1.2B) of the full model, reducing memory footprint while keeping adaptation capacity.

### 3) Suite-specific training scripts (4 suites)
Implemented and validated suite-specific fine-tuning scripts:
- LIBERO Spatial
- LIBERO Object
- LIBERO Goal
- LIBERO-10

Training highlights:
- **DeepSpeed ZeRO-2** distributed training
- **BF16** mixed precision
- Large effective batch size via gradient accumulation

### 4) Automated evaluation framework (parallel envs + videos)
Built a configuration-driven evaluation system:
- YAML configs per suite (`examples/LIBERO/eval/config/`)
- **Parallel evaluation** with 5 concurrent environments
- Automatic logging (CSV + detailed logs)
- Automatic **video recording** for qualitative verification (e.g., 3 videos per task)

Outputs are organized per run with results, logs, and videos:
- `examples/LIBERO/eval/out/<suite_timestamp>/...`

### 5) Model release
Published four benchmark-validated fine-tuned checkpoints on HuggingFace:
- Spatial (98.5% SR)
- Object (100.0% SR)
- Goal (97.0% SR)
- LIBERO-10 (95.5% SR)

## Results
### Overall
- **Average success:** **97.8%** (782/800 episodes)
- **Perfect tasks:** 31/40 tasks achieve 100% SR
- **Training cost:** ~100 GPU-hours (8 GPUs)

### Per-suite performance
- **Spatial:** 98.5% (197/200), checkpoint-20000
- **Object:** 100.0% (200/200), checkpoint-20000
- **Goal:** 97.0% (194/200), checkpoint-40000
- **LIBERO-10:** 95.5% (191/200), checkpoint-20000

### Baseline comparison (published vs mine)
Under the same evaluation protocol:
- **Mine:** 97.8% average
- **Published baseline:** 97.0% average
- **Delta:** **+0.8% average**
