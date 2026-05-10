'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { LiquidGlassCard } from '@/components/liquid/LiquidGlassCard';

// Product descriptions mapping
const productDescriptions: { [key: string]: string } = {
  'Hypervisor': 'NQRust-HV is a memory-safe enterprise hypervisor built with Rust, designed to deliver strong isolation, high performance, and significantly reduced attack surfaces. By leveraging Rust\'s safety guarantees, NQRust-HV minimizes entire classes of vulnerabilities while maintaining near bare-metal efficiency. It is ideal for secure, large-scale virtualization in modern cloud and enterprise environments.',
  'HV Hypervisor': 'NQRust-HV is a memory-safe enterprise hypervisor built with Rust, designed to deliver strong isolation, high performance, and significantly reduced attack surfaces. By leveraging Rust\'s safety guarantees, NQRust-HV minimizes entire classes of vulnerabilities while maintaining near bare-metal efficiency. It is ideal for secure, large-scale virtualization in modern cloud and enterprise environments.',
  'HV': 'NQRust-HV is a memory-safe enterprise hypervisor built with Rust, designed to deliver strong isolation, high performance, and significantly reduced attack surfaces. By leveraging Rust\'s safety guarantees, NQRust-HV minimizes entire classes of vulnerabilities while maintaining near bare-metal efficiency. It is ideal for secure, large-scale virtualization in modern cloud and enterprise environments.',
  'MicroVM': 'NQRust-MicroVM bridges containers and virtual machines by combining fast startup times, lightweight resource usage, and strong security isolation. It provides the agility of containers with the isolation guarantees of VMs, making it ideal for multi-tenant platforms, serverless workloads, and secure application sandboxes that require both performance and safety.',
  'Storage': 'NQRust-Storage delivers S3-compatible, geo-distributed object storage designed for high durability, massive scalability, and enterprise-grade security. It supports modern cloud-native applications while ensuring data resilience across regions, making it suitable for backup, data lakes, AI workloads, and large-scale content storage.',
  'FleetMgr': 'NQRust-FleetMgr unifies containers, MicroVMs, and virtual machines into a single centralized control plane. It simplifies lifecycle management, orchestration, and monitoring across heterogeneous environments, enabling teams to manage diverse workloads consistently, efficiently, and at scale.',
  'SecureGPU': 'NQRust-SecureGPU maximizes GPU return on investment through secure multi-tenant sharing, strong workload isolation, and policy-based access control. It enables multiple workloads to safely share GPU resources without compromising performance or security, making it ideal for AI, ML, and high-performance computing environments.',
  'Secure GPU': 'NQRust-SecureGPU maximizes GPU return on investment through secure multi-tenant sharing, strong workload isolation, and policy-based access control. It enables multiple workloads to safely share GPU resources without compromising performance or security, making it ideal for AI, ML, and high-performance computing environments.',
  'Enclave': 'NQRust-Enclave brings confidential computing to enterprises by protecting data and code while they are in use. Using hardware-backed trusted execution environments, it ensures sensitive workloads remain secure even from privileged system access, enabling secure processing of highly sensitive data.',
  'Lake': 'NQRust-Lake is a Rust-powered data lakehouse that unifies structured and unstructured data into a single platform. It supports analytics, AI, and large-scale data processing with high performance, strong consistency, and modern data governance capabilities.',
  'Analytics': 'NQRust-Analytics turns complex business questions into real-time insights through high-performance query execution and scalable data processing. It is designed to handle large datasets efficiently, enabling faster decision-making and deeper analytical capabilities across the organization.',
  'Insight': 'NQRust-Insight upgrades traditional observability into proactive intelligence by correlating logs, metrics, and traces in a unified system. It helps teams detect anomalies faster, understand system behavior more clearly, and resolve issues before they impact users.',
  'Guard': 'NQRust-Guard modernizes enterprise backup and disaster recovery with immutable storage, rapid restore capabilities, and built-in ransomware protection. It ensures critical data remains safe, recoverable, and resilient against both system failures and malicious attacks.',
  'Edge': 'NQRust-Edge is a Rust-powered platform for deploying, managing, and securing workloads across distributed edge environments. It enables consistent operations from core data centers to remote edge locations, supporting low-latency processing and decentralized architectures.',
  'AI Appliance': 'NQRust-AI Appliance delivers an "AI Cloud in a Box," allowing organizations to run AI workloads on-premise with cloud-like simplicity. It simplifies deployment, management, and scaling of AI infrastructure while maintaining full control over data and compliance.',
  'LLMOps': 'NQRust-LLMOps is a Rust-powered operations platform designed to deploy, monitor, secure, and scale large language models in production. It provides the tooling required to manage LLM lifecycles reliably, efficiently, and securely in enterprise environments.',
  'LLM Ops': 'NQRust-LLMOps is a Rust-powered operations platform designed to deploy, monitor, secure, and scale large language models in production. It provides the tooling required to manage LLM lifecycles reliably, efficiently, and securely in enterprise environments.',
  'Identity': 'NQRust-Identity consolidates identity and access management into a unified system built on zero-trust principles. It provides fine-grained access control, centralized identity governance, and strong security foundations for modern distributed systems.',
  'ZeroCode': 'NQRust-Zerocode enables teams to build enterprise applications and workflows without writing code. It accelerates digital transformation by empowering business users and developers alike to create, adapt, and deploy solutions quickly.',
  'Zerocode': 'NQRust-Zerocode enables teams to build enterprise applications and workflows without writing code. It accelerates digital transformation by empowering business users and developers alike to create, adapt, and deploy solutions quickly.',
  'Zero Code': 'NQRust-Zerocode enables teams to build enterprise applications and workflows without writing code. It accelerates digital transformation by empowering business users and developers alike to create, adapt, and deploy solutions quickly.',
  'BPMN': 'NQRust-BPMN is an enterprise workflow automation engine that executes BPMN processes reliably at scale. It enables organizations to model, automate, and optimize complex business processes with consistency, visibility, and performance.'
};

// Mapping product titles to whitepaper files
const whitepaperMapping: { [key: string]: string } = {
  'AI Appliance': '[Nexus] NexusRust Secure-AI-DC v1.0.pdf',
  'FleetMgr': '[Nexus] NQRust-FleetMgr v2.0.pdf',
  'HV Hypervisor': '[Nexus] NQRust-HV v2.0.pdf',
  'Lake': '[Nexus] NQRust-Lake v2.0.pdf',
  'MicroVM': '[Nexus] NQRust-MicroVM v1.0.pdf',
  'Storage': '[Nexus] NQRust-Storage v2.0.pdf',
  'Edge': '[Nexus] NQRust-Edge v1.0.pdf',
  'Identity': '[Nexus] NQRust-Identity v1.0.pdf',
  'LLMOps': '[Nexus] NQRust-LLMOps v1.0.pdf',
  'SecureGPU': '[Nexus] NQRust-SecureGPU v1.0.pdf',
  // Products without whitepaper files (will be disabled)
  'Analytics': '',
  'BPMN': '',
  'Enclave': '',
  'Guard': '',
  'HV': '',
  'Insight': '',
  'ZeroCode': '',
};

// Mapping product titles to brochure files (mapped to files in public/Finalized Brochure)
const brochureMapping: { [key: string]: string } = {
  'AI Appliance': '[Nexus] Brochure NQRust-AI Appliance v1.0.pdf',
  'Analytics': '[Nexus] Brochure NQRust-Analytics v1.0.pdf',
  'BPMN': '[Nexus] Brochure NQRust-BPMN v1.0.pdf',
  'Edge': '[Nexus] Brochure NQRust-Edge v1.0.pdf',
  'Enclave': '[Nexus] Brochure NQRust-Enclave v1.0.pdf',
  'FleetMgr': '[Nexus] Brochure NQRust-FleetMgr v1.0.pdf',
  'Guard': '[Nexus] Brochure NQRust-Guard v1.0.pdf',
  'HV': '[Nexus] Brochure NQRust-HV v1.0.pdf',
  'HV Hypervisor': '[Nexus] Brochure NQRust-HV v1.0.pdf',
  'Hypervisor': '[Nexus] Brochure NQRust-HV v1.0.pdf',
  'Identity': '[Nexus] Brochure NQRust-Identity v1.0.pdf',
  'Insight': '[Nexus] Brochure NQRust-Insight v1.0.pdf',
  'Lake': '[Nexus] Brochure NQRust-Lake v1.0.pdf',
  'LLMOps': '[Nexus] Brochure NQRust-LLMOps v1.0.pdf',
  'LLM Ops': '[Nexus] Brochure NQRust-LLMOps v1.0.pdf',
  'MicroVM': '[Nexus] Brochure NQRust-MicroVM v1.0.pdf',
  'SecureGPU': '[Nexus] Brochure NQRust-SecureGPU v1.0.pdf',
  'Secure GPU': '[Nexus] Brochure NQRust-SecureGPU v1.0.pdf',
  'Storage': '[Nexus] Brochure NQRust-Storage v1.0.pdf',
  'ZeroCode': '[Nexus] Brochure NQRust-ZeroCode v1.0.pdf',
  'Zerocode': '[Nexus] Brochure NQRust-ZeroCode v1.0.pdf',
  'Zero Code': '[Nexus] Brochure NQRust-ZeroCode v1.0.pdf',
};

// Benefits mapping for each product - Easy to edit and update
const productBenefitsMapping: { [key: string]: Benefit[] } = {
  'Analytics': [
    { 
      id: 1, 
      title: 'Conversational insights for every team', 
      description: 'Business users ask questions in plain language and get charts, trends, and explanations instantly, without SQL or waiting for analysts. This democratizes analytics across functions, reduces IT queues, and enables faster cross-team alignment on KPIs. Result: more decisions backed by data, not intuition, and higher confidence in executive reviews from day one.' 
    },
    { 
      id: 2, 
      title: 'Sub-second decisions with 20× speed', 
      description: 'Rust-native query processing delivers sub-second responses and handles high concurrency, turning multi-day reporting cycles into real-time exploration. Executives can validate assumptions during meetings, detect anomalies early, and respond to market shifts faster. Faster insight cycles directly improve pricing, risk management, and operational efficiency while reducing the cost of analytics infrastructure.' 
    },
    { 
      id: 3, 
      title: 'Lower BI spend, higher adoption', 
      description: 'Replace expensive per-user BI licensing and fragmented tools with a unified platform built on NQRust-Lake. With minimal training and 95%+ adoption potential, you cut consultant dependence, reduce support tickets, and standardize governance. The business impact is lower five-year TCO, higher insight coverage, and measurable ROI through faster execution and fewer errors.' 
    }
  ],
  'FleetMgr': [
    { 
      id: 1, 
      title: 'Single control plane for workloads', 
      description: 'Consolidate containers, MicroVMs, AI/ML jobs, and edge nodes under one orchestration layer. Teams stop juggling 3–5 tools and inconsistent processes. Standardized workflows reduce operational chaos, simplify governance, and shorten deployment from weeks to hours. The business impact is faster product delivery, fewer outages, and lower platform management headcount across the enterprise.' 
    },
    { 
      id: 2, 
      title: 'AI-driven scheduling boosts utilization', 
      description: 'FleetMgr\'s intelligent scheduler increases CPU, memory, GPU, and network utilization by placing workloads based on demand patterns and policies. Higher utilization means fewer servers and GPUs to buy, and less idle capacity. This directly lowers OPEX and CAPEX, improves SLA performance through smarter failover, and enables predictable scaling for growth.' 
    },
    { 
      id: 3, 
      title: 'Built-in Indonesian compliance automation', 
      description: 'Automate data residency, audit trails, and regulatory reporting with profiles for UU PDP, OJK, BI, and government standards. Compliance becomes enforced by policy, not spreadsheets and manual checks. This reduces regulatory risk, speeds audits, and protects executive accountability. The outcome is safer multi-cloud operations, faster approvals, and fewer compliance-driven delays in projects.' 
    }
  ],
  'LLMOps': [
    { 
      id: 1, 
      title: 'Faster model delivery at scale', 
      description: 'Accelerate experimentation and productionization with integrated training, fine-tuning, versioning, and deployment workflows. With faster training cycles and one-click rollout, teams ship new AI capabilities in days, not months. This improves time-to-market for customer service, analytics, and automation initiatives, creating competitive advantage and measurable revenue lift from AI-enabled products across business units.' 
    },
    { 
      id: 2, 
      title: 'Lower GPU costs, higher throughput', 
      description: 'Optimize GPU utilization and inference efficiency through modern serving techniques, batching, quantization, and smart scheduling. Better utilization means you need fewer GPUs for the same workload, cutting recurring infrastructure spend. The business impact is lower AI TCO, higher service reliability under peak demand, and the ability to expand AI usage without budget shocks.' 
    },
    { 
      id: 3, 
      title: 'Secure, compliant AI operations', 
      description: 'Run LLMs with strong controls: encryption, access governance, audit trails, and isolation for training and inference. Built-in data sovereignty options support regulated industries where data cannot leave controlled environments. This reduces data leakage and vendor lock-in risk, strengthens regulator confidence, and enables wider AI adoption in sensitive workflows like finance, healthcare, and government.' 
    }
  ],
  'LLM Ops': [
    { 
      id: 1, 
      title: 'Faster model delivery at scale', 
      description: 'Accelerate experimentation and productionization with integrated training, fine-tuning, versioning, and deployment workflows. With faster training cycles and one-click rollout, teams ship new AI capabilities in days, not months. This improves time-to-market for customer service, analytics, and automation initiatives, creating competitive advantage and measurable revenue lift from AI-enabled products across business units.' 
    },
    { 
      id: 2, 
      title: 'Lower GPU costs, higher throughput', 
      description: 'Optimize GPU utilization and inference efficiency through modern serving techniques, batching, quantization, and smart scheduling. Better utilization means you need fewer GPUs for the same workload, cutting recurring infrastructure spend. The business impact is lower AI TCO, higher service reliability under peak demand, and the ability to expand AI usage without budget shocks.' 
    },
    { 
      id: 3, 
      title: 'Secure, compliant AI operations', 
      description: 'Run LLMs with strong controls: encryption, access governance, audit trails, and isolation for training and inference. Built-in data sovereignty options support regulated industries where data cannot leave controlled environments. This reduces data leakage and vendor lock-in risk, strengthens regulator confidence, and enables wider AI adoption in sensitive workflows like finance, healthcare, and government.' 
    }
  ],
  'Storage': [
    { 
      id: 1, 
      title: 'Slash object storage operating costs', 
      description: 'Replace hyperscale cloud bills and complex multi-vendor storage with an S3-compatible platform designed for enterprise economics. Geo-distributed architecture and efficient storage mechanisms reduce long-term spend and make costs predictable as data grows. The business impact is improved margin, budget certainty, and freedom to reinvest savings into analytics, AI, and product innovation.' 
    },
    { 
      id: 2, 
      title: 'Faster global access, lower latency', 
      description: 'Deliver fast reads and consistent performance for content, data lakes, and edge applications by placing data closer to users and workloads. Lower latency improves customer experience for media, e-commerce, and mobile apps while reducing bandwidth and CDN dependence. For executives, this translates to higher conversion, better user retention, and resilient service quality across regions.' 
    },
    { 
      id: 3, 
      title: 'S3 compatibility without vendor lock-in', 
      description: 'Maintain existing S3 tools, SDKs, and processes while gaining full control over data residency, security policies, and lifecycle management. By avoiding proprietary cloud constraints, you can negotiate better contracts, adopt best-of-breed analytics platforms, and move workloads without redesign. The business impact is strategic flexibility, reduced migration risk, and stronger compliance posture.' 
    }
  ],
  'BPMN': [
    { 
      id: 1, 
      title: 'Automate workflows with BPMN standard', 
      description: 'Use BPMN 2.0 visual modeling to turn business processes into executable workflows without lengthy custom development. Business and IT teams collaborate on the same process language, accelerating change and reducing misinterpretation. The impact is faster process rollout, consistent execution across departments, and a scalable foundation for end-to-end digital transformation initiatives.' 
    },
    { 
      id: 2, 
      title: 'Cut cycle time and errors', 
      description: 'Eliminate manual handoffs, rework, and bottlenecks with automated task routing, SLAs, and exception handling. Faster cycle times improve customer experience in onboarding, approvals, and service delivery. Reduced human error protects quality and reduces costly disputes. Executives see measurable gains in productivity, lower operational cost, and improved service reliability across core processes.' 
    },
    { 
      id: 3, 
      title: 'Audit-ready processes for compliance', 
      description: 'Create consistent, traceable workflows with automated documentation, audit logs, and policy enforcement. This reduces compliance workload, speeds internal and external audits, and lowers regulatory exposure. Compliance becomes a built-in capability that protects executive accountability without adding bureaucracy.' 
    }
  ],
  'Identity': [
    { 
      id: 1, 
      title: 'Seamless single sign-on everywhere', 
      description: 'Give employees and partners one secure login across cloud, on-prem, and legacy apps using standard protocols such as SAML, OIDC, and LDAP. Less friction means higher productivity, faster adoption of new tools, and smoother partner or supplier portals. Executives gain improved workforce efficiency and faster onboarding while reducing password resets and shadow IT.' 
    },
    { 
      id: 2, 
      title: 'Zero-trust access reduces breaches', 
      description: 'Apply continuous verification with MFA, adaptive policies, and risk-based controls to stop credential misuse. Strong identity controls reduce ransomware impact and protect critical systems without slowing users. The business impact is lower incident cost, improved audit outcomes, and stronger trust from regulators, customers, and partners.' 
    },
    { 
      id: 3, 
      title: 'Lower IAM costs and tickets', 
      description: 'Consolidate fragmented identity tools into a single platform with high availability and automated compliance reporting. Fewer systems mean lower licensing spend and less helpdesk load. IT teams focus on innovation while executives see measurable savings and improved user satisfaction.' 
    }
  ],
  'Enclave': [
    { 
      id: 1, 
      title: 'Protect data while in use', 
      description: 'Use hardware Trusted Execution Environments to keep sensitive data encrypted during computation, not just at rest or in transit. This prevents exposure to cloud administrators, insiders, and advanced attacks. Executives gain a strong risk-reduction story for regulators and customers.' 
    },
    { 
      id: 2, 
      title: 'Zero-trust collaboration across organizations', 
      description: 'Run multi-party analytics or model training where participants verify environments through remote attestation before sharing data. This enables joint fraud detection, healthcare research, and cross-agency intelligence without exposing raw data, unlocking collaboration previously blocked by trust barriers.' 
    },
    { 
      id: 3, 
      title: 'Confidential AI with lower TCO', 
      description: 'Reduce the need for expensive dedicated secure facilities by using TEEs with minimal performance overhead. Secure enclaves allow regulated workloads to run on shared infrastructure, lowering capital spend and enabling more AI use cases per budget.' 
    }
  ],
  'ZeroCode': [
    { 
      id: 1, 
      title: 'Visual apps and APIs faster', 
      description: 'Enable business and IT teams to design APIs, integrations, and backend services through drag-and-drop components and reusable templates. Delivery cycles compress from months to days, removing dependency on scarce developer capacity and accelerating digital initiatives.' 
    },
    { 
      id: 2, 
      title: 'Reduce software delivery cost dramatically', 
      description: 'Generate optimized Rust services automatically to reduce bugs, eliminate technical debt, and simplify maintenance. Fewer custom codebases lower security risk and long-term operating costs, giving leaders predictable delivery budgets.' 
    },
    { 
      id: 3, 
      title: 'Enterprise-grade security without coding', 
      description: 'Standardize authentication, authorization, validation, and audit logging as built-in capabilities. Rust memory safety and predefined components reduce vulnerabilities and improve compliance readiness, resulting in fewer incidents and faster approvals.' 
    }
  ],
  'Zerocode': [
    { 
      id: 1, 
      title: 'Visual apps and APIs faster', 
      description: 'Enable business and IT teams to design APIs, integrations, and backend services through drag-and-drop components and reusable templates. Delivery cycles compress from months to days, removing dependency on scarce developer capacity and accelerating digital initiatives.' 
    },
    { 
      id: 2, 
      title: 'Reduce software delivery cost dramatically', 
      description: 'Generate optimized Rust services automatically to reduce bugs, eliminate technical debt, and simplify maintenance. Fewer custom codebases lower security risk and long-term operating costs, giving leaders predictable delivery budgets.' 
    },
    { 
      id: 3, 
      title: 'Enterprise-grade security without coding', 
      description: 'Standardize authentication, authorization, validation, and audit logging as built-in capabilities. Rust memory safety and predefined components reduce vulnerabilities and improve compliance readiness, resulting in fewer incidents and faster approvals.' 
    }
  ],
  'Zero Code': [
    { 
      id: 1, 
      title: 'Visual apps and APIs faster', 
      description: 'Enable business and IT teams to design APIs, integrations, and backend services through drag-and-drop components and reusable templates. Delivery cycles compress from months to days, removing dependency on scarce developer capacity and accelerating digital initiatives.' 
    },
    { 
      id: 2, 
      title: 'Reduce software delivery cost dramatically', 
      description: 'Generate optimized Rust services automatically to reduce bugs, eliminate technical debt, and simplify maintenance. Fewer custom codebases lower security risk and long-term operating costs, giving leaders predictable delivery budgets.' 
    },
    { 
      id: 3, 
      title: 'Enterprise-grade security without coding', 
      description: 'Standardize authentication, authorization, validation, and audit logging as built-in capabilities. Rust memory safety and predefined components reduce vulnerabilities and improve compliance readiness, resulting in fewer incidents and faster approvals.' 
    }
  ],
  'SecureGPU': [
    { 
      id: 1, 
      title: 'Maximize GPU utilization and ROI', 
      description: 'Increase GPU utilization from typical 20–35% to 85%+ through hardware partitioning and intelligent scheduling. Higher utilization reduces capital and operating costs, enabling more AI projects per dollar invested.' 
    },
    { 
      id: 2, 
      title: 'Secure multi-tenant GPU sharing', 
      description: 'Enable isolated workloads on shared GPUs using MIG or SR-IOV with memory sanitization and policy controls. This prevents data leakage and supports audit requirements, allowing safe monetization of shared GPU clusters.' 
    },
    { 
      id: 3, 
      title: 'Faster provisioning for AI teams', 
      description: 'Allocate GPU slices in seconds instead of hours, reducing queues and shadow infrastructure. Faster provisioning improves AI time-to-value, developer productivity, and reliability.' 
    }
  ],
  'Secure GPU': [
    { 
      id: 1, 
      title: 'Maximize GPU utilization and ROI', 
      description: 'Increase GPU utilization from typical 20–35% to 85%+ through hardware partitioning and intelligent scheduling. Higher utilization reduces capital and operating costs, enabling more AI projects per dollar invested.' 
    },
    { 
      id: 2, 
      title: 'Secure multi-tenant GPU sharing', 
      description: 'Enable isolated workloads on shared GPUs using MIG or SR-IOV with memory sanitization and policy controls. This prevents data leakage and supports audit requirements, allowing safe monetization of shared GPU clusters.' 
    },
    { 
      id: 3, 
      title: 'Faster provisioning for AI teams', 
      description: 'Allocate GPU slices in seconds instead of hours, reducing queues and shadow infrastructure. Faster provisioning improves AI time-to-value, developer productivity, and reliability.' 
    }
  ],
  'Lake': [
    { 
      id: 1, 
      title: 'Unified lakehouse for real-time decisions', 
      description: 'Consolidate batch, streaming, and analytics workloads into one ACID-governed lakehouse. A single source of truth improves executive decision velocity and cross-functional alignment.' 
    },
    { 
      id: 2, 
      title: 'Lower data platform total cost', 
      description: 'Replace fragmented warehouses and query engines with a Rust-native platform optimized for efficiency. Lower five-year TCO and reduced complexity improve margins and predictability at scale.' 
    },
    { 
      id: 3, 
      title: 'Faster AI and analytics deployment', 
      description: 'Serve consistent, well-governed datasets to accelerate model training and inference. Reduced data wrangling increases data science throughput and speeds AI rollout.' 
    }
  ],
  'Guard': [
    { 
      id: 1, 
      title: 'Faster backups and restores', 
      description: 'Shorten backup windows and recovery times with high-throughput orchestration. Faster recovery protects revenue and improves RPO/RTO metrics during incidents.' 
    },
    { 
      id: 2, 
      title: 'Ransomware-proof immutable recovery at scale', 
      description: 'Use immutable WORM backups, encryption, and audit logs to protect recovery points. This lowers breach impact and strengthens compliance posture.' 
    },
    { 
      id: 3, 
      title: 'Shrink backup storage footprint greatly', 
      description: 'Reduce storage needs with deduplication and compression, lowering capacity, replication bandwidth, and long-term archive costs for predictable budgets.' 
    }
  ],
  'Edge': [
    { 
      id: 1, 
      title: 'Deploy edge nodes in minutes securely', 
      description: 'Rapidly deploy standardized edge compute using MicroVM isolation and centralized fleet management. Faster rollout enables new services with lower operational risk.' 
    },
    { 
      id: 2, 
      title: 'Autonomous operations during connectivity loss', 
      description: 'Keep workloads running locally with offline autonomy and self-healing behavior. This ensures availability in remote environments and protects customer experience.' 
    },
    { 
      id: 3, 
      title: 'Reduce bandwidth and site visits', 
      description: 'Process data at the edge to reduce backhaul traffic and cloud dependency. Centralized management lowers OPEX and simplifies operations at scale.' 
    }
  ],
  'Insight': [
    { 
      id: 1, 
      title: 'Prevent incidents with predictive monitoring', 
      description: 'Detect anomalies early by correlating metrics, logs, and traces in real time. Faster detection protects revenue and improves SLA performance.' 
    },
    { 
      id: 2, 
      title: 'Reduce infrastructure waste and spend', 
      description: 'Identify underutilized resources across compute, GPU, storage, and network layers. Improved utilization lowers OPEX and enables data-driven capacity planning.' 
    },
    { 
      id: 3, 
      title: 'Automate operations with self-healing', 
      description: 'Automate remediation through intelligent alerting and policy-based actions. Reduced firefighting improves uptime and operational predictability.' 
    }
  ],
  'HV': [
    { 
      id: 1, 
      title: 'Replace legacy hypervisor licensing costs', 
      description: 'Reduce virtualization TCO by migrating from expensive licensing models to a cost-efficient cloud-native hypervisor. Lower fees and higher density provide immediate budget relief.' 
    },
    { 
      id: 2, 
      title: 'Secure virtualization with Rust safety', 
      description: 'Eliminate memory-corruption vulnerabilities using Rust\'s compile-time safety. Reduced attack surface strengthens regulatory compliance and risk posture.' 
    },
    { 
      id: 3, 
      title: 'Provision VMs in 100ms at scale', 
      description: 'Provision virtual machines in milliseconds to support CI/CD, burst workloads, and rapid scaling. Faster provisioning improves release velocity and resilience.' 
    }
  ],
  'HV Hypervisor': [
    { 
      id: 1, 
      title: 'Replace legacy hypervisor licensing costs', 
      description: 'Reduce virtualization TCO by migrating from expensive licensing models to a cost-efficient cloud-native hypervisor. Lower fees and higher density provide immediate budget relief.' 
    },
    { 
      id: 2, 
      title: 'Secure virtualization with Rust safety', 
      description: 'Eliminate memory-corruption vulnerabilities using Rust\'s compile-time safety. Reduced attack surface strengthens regulatory compliance and risk posture.' 
    },
    { 
      id: 3, 
      title: 'Provision VMs in 100ms at scale', 
      description: 'Provision virtual machines in milliseconds to support CI/CD, burst workloads, and rapid scaling. Faster provisioning improves release velocity and resilience.' 
    }
  ],
  'Hypervisor': [
    { 
      id: 1, 
      title: 'Replace legacy hypervisor licensing costs', 
      description: 'Reduce virtualization TCO by migrating from expensive licensing models to a cost-efficient cloud-native hypervisor. Lower fees and higher density provide immediate budget relief.' 
    },
    { 
      id: 2, 
      title: 'Secure virtualization with Rust safety', 
      description: 'Eliminate memory-corruption vulnerabilities using Rust\'s compile-time safety. Reduced attack surface strengthens regulatory compliance and risk posture.' 
    },
    { 
      id: 3, 
      title: 'Provision VMs in 100ms at scale', 
      description: 'Provision virtual machines in milliseconds to support CI/CD, burst workloads, and rapid scaling. Faster provisioning improves release velocity and resilience.' 
    }
  ],
  'AI Appliance': [
    { 
      id: 1, 
      title: 'Deploy AI infrastructure in one day', 
      description: 'Receive a pre-configured AI stack that eliminates long integration projects. Faster deployment accelerates pilots and enterprise AI rollout.' 
    },
    { 
      id: 2, 
      title: 'Predictable performance with integrated stack', 
      description: 'Pre-tuned compute, GPU, storage, and networking deliver consistent performance for training and inference, improving SLA confidence and ROI.' 
    },
    { 
      id: 3, 
      title: 'Single-vendor support lowers project risk', 
      description: 'A turnkey system with enterprise support removes multi-vendor complexity. Faster procurement and troubleshooting increase project success rates.' 
    }
  ],
  'MicroVM': [
    { 
      id: 1, 
      title: 'Container speed with VM isolation', 
      description: 'Achieve container-like startup speed with VM-grade isolation. This prevents lateral movement and container escape while preserving modern DevOps workflows.' 
    },
    { 
      id: 2, 
      title: 'Enable compliant multi-tenant platforms', 
      description: 'Meet strict regulatory requirements without heavyweight VMs. Automated compliance enables secure multi-tenant services and expansion into regulated markets.' 
    },
    { 
      id: 3, 
      title: 'Increase density and reduce costs significantly', 
      description: 'Run thousands of microVMs per server to maximize density and reduce hardware, power, and space costs. This improves unit economics and simplifies operations.' 
    }
  ]
};

interface Benefit {
  id: number;
  title: string;
  description: string;
}

interface ProductDetailLayout2Props {
  productName: string;
  productTitle: string;
  description: string;
  benefits: Benefit[];
  backgroundImage?: string;
  brochureUrl?: string;
  whitepaperUrl?: string;
  aboutDescription?: string; // Deskripsi khusus untuk About Section (opsional)
  /** When set, hero primary CTA opens this URL instead of brochure download */
  heroPrimaryExternalUrl?: string;
  heroPrimaryExternalLabel?: string;
}

export default function ProductDetailLayout2({
  productName,
  productTitle,
  description,
  benefits,
  backgroundImage = "/bg-product.png",
  brochureUrl = "#",
  whitepaperUrl = "#",
  aboutDescription, // Jika tidak ada, akan menggunakan description
  heroPrimaryExternalUrl,
  heroPrimaryExternalLabel,
}: ProductDetailLayout2Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingBrochure, setIsDownloadingBrochure] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState(0);
  
  // Get benefits from mapping (priority) or use provided benefits as fallback
  const getBenefits = (): Benefit[] => {
    // Try multiple variations of productTitle to find matching benefits in mapping first
    const variations = [
      productTitle,
      productTitle.replace('NQRust ', ''),
      productTitle.replace('NQRust-', ''),
      productTitle.split(' ')[0], // First word
      productTitle.split('-')[0] // Before first dash
    ];
    
    for (const variation of variations) {
      if (productBenefitsMapping[variation]) {
        return productBenefitsMapping[variation];
      }
    }
    
    // Fallback to provided benefits if no mapping found
    if (benefits && benefits.length > 0) {
      return benefits;
    }
    
    // Final fallback to empty array
    return [];
  };
  
  const displayBenefits = getBenefits();
  
  // Check if whitepaper file exists
  const whitepaperFileName = whitepaperMapping[productTitle];
  const hasWhitepaper = !!whitepaperFileName && whitepaperFileName.trim() !== '';
  const actualWhitepaperUrl = hasWhitepaper ? `/Finalized Whitepaper/${whitepaperFileName}` : "#";

  // Check if brochure file exists
  const brochureFileName = brochureMapping[productTitle];
  const hasBrochure = !!brochureFileName && brochureFileName.trim() !== '';
  const actualBrochureUrl = hasBrochure ? `/Finalized Brochure/${brochureFileName}` : "#";

  // Handle whitepaper download
  const handleWhitepaperDownload = async () => {
    if (hasWhitepaper && !isDownloading) {
      setIsDownloading(true);
      try {
        // Fetch the file first to ensure it exists
        const response = await fetch(actualWhitepaperUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = whitepaperFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          // Fallback: Open in new tab if fetch fails
          window.open(actualWhitepaperUrl, '_blank');
        }
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback: Open in new tab
        window.open(actualWhitepaperUrl, '_blank');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  // Handle brochure download
  const handleBrochureDownload = async () => {
    if (hasBrochure && !isDownloadingBrochure) {
      setIsDownloadingBrochure(true);
      try {
        // Fetch the file first to ensure it exists
        const response = await fetch(actualBrochureUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = brochureFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          // Fallback: Open in new tab if fetch fails
          window.open(actualBrochureUrl, '_blank');
        }
      } catch (error) {
        console.error('Download failed:', error);
        // Fallback: Open in new tab
        window.open(actualBrochureUrl, '_blank');
      } finally {
        setIsDownloadingBrochure(false);
      }
    }
  };
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content with Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="fixed inset-0 -z-10">
          <Image
            src={backgroundImage}
            alt="Product background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay and Content */}
        <div className="relative bg-black/80 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 lg:px-[100px] py-8 lg:py-12 pt-24">
          {/* Hero Section */}
          <div className="w-full max-w-5xl mx-auto text-center px-4 sm:px-8 lg:px-[70px] mb-4">
            <LiquidGlassCard
              style={{
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '30px',
                padding: '70px'
              }}
            >
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-[54px] leading-[1.3] mb-4">
                <span className="bg-gradient-to-b from-[#FF5001] to-[#FF9C6D] bg-clip-text text-transparent">NQRust </span>
                <span className="text-[#fffefd]">{productTitle}</span>
              </h1>
              <p className="font-medium text-base sm:text-lg lg:text-[18px] leading-[1.3] text-[#fffefd] mb-6">
                {description}
              </p>
              
              {/* Brochure and Whitepaper Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {heroPrimaryExternalUrl ? (
                  <a
                    href={heroPrimaryExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-300 min-w-[180px] transform bg-[#ff6b2b] text-white hover:bg-[#e55a20] hover:scale-105 hover:shadow-lg hover:shadow-[#ff6b2b]/25 cursor-pointer active:scale-95"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {heroPrimaryExternalLabel ?? "Learn more"}
                  </a>
                ) : (
                <button
                  onClick={handleBrochureDownload}
                  disabled={!hasBrochure || isDownloadingBrochure}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-300 min-w-[180px] transform ${
                    hasBrochure && !isDownloadingBrochure
                      ? 'bg-[#ff6b2b] text-white hover:bg-[#e55a20] hover:scale-105 hover:shadow-lg hover:shadow-[#ff6b2b]/25 cursor-pointer active:scale-95'
                      : hasBrochure && isDownloadingBrochure
                      ? 'bg-[#ff6b2b] border-2 border-[#ff6b2b] text-white cursor-wait'
                      : 'bg-gray-400 border-2 border-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {isDownloadingBrochure ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12.75L4.5 8.25H7.5V3H10.5V8.25H13.5L9 12.75Z" fill="currentColor"/>
                    </svg>
                  )}
                  {isDownloadingBrochure ? 'Downloading...' : hasBrochure ? 'Get Brochure' : 'Coming Soon'}
                </button>
                )}
                <button
                  onClick={handleWhitepaperDownload}
                  disabled={!hasWhitepaper || isDownloading}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-300 min-w-[180px] transform ${
                    hasWhitepaper && !isDownloading
                      ? 'bg-transparent border-2 border-[#ff6b2b] text-[#ff6b2b] hover:bg-[#ff6b2b] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-[#ff6b2b]/25 cursor-pointer active:scale-95'
                      : hasWhitepaper && isDownloading
                      ? 'bg-[#ff6b2b] border-2 border-[#ff6b2b] text-white cursor-wait'
                      : 'bg-gray-400 border-2 border-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {isDownloading ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 6H15M3 9H15M3 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {isDownloading ? 'Downloading...' : hasWhitepaper ? 'Whitepaper' : 'Coming Soon'}
                </button>
              </div>
            </LiquidGlassCard>
          </div>

          {/* Benefits Grid - Updated to match Figma design */}
          <div className="w-full max-w-[1128px] px-4 sm:px-6 md:px-8 lg:px-0">
            <div
                  style={{
                background: 'rgba(0, 0, 0, 0)',
                backdropFilter: 'blur(18px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                padding: '16px',
                width: '100%'
              }}
              className="lg:p-[28px]"
            >
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-[16px] items-center justify-between">
              {/* Left Column - Text Content */}
              <div className="flex flex-col gap-4 sm:gap-[16px] items-start w-full lg:w-[654px]">
                {/* Title */}
                <p className="font-montserrat font-semibold leading-[1.3] text-[#ff5001] text-[20px] sm:text-[22px] md:text-[24px] w-full">
                  About Product
                </p>
                
                {/* Description */}
                <p className="font-montserrat font-normal leading-[1.3] text-[#fffefd] text-[14px] sm:text-[15px] md:text-[16px] w-full">
                  {aboutDescription || (() => {
                    // Try multiple variations of productTitle to find matching description
                    const variations = [
                      productTitle,
                      productTitle.replace('NQRust ', ''),
                      productTitle.replace('NQRust-', ''),
                      productTitle.split(' ')[0], // First word
                      productTitle.split('-')[0] // Before first dash
                    ];
                    
                    for (const variation of variations) {
                      if (productDescriptions[variation]) {
                        return productDescriptions[variation];
                      }
                    }
                    
                    return description;
                  })()}
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-[16px] items-start w-full sm:w-auto">
                  {/* Get Brochure Button */}
                  <button
                    onClick={handleBrochureDownload}
                    disabled={!hasBrochure || isDownloadingBrochure}
                    className={`inline-flex items-center justify-center gap-2 sm:gap-[10px] px-3 sm:px-[14px] py-2.5 sm:py-[10px] text-[13px] sm:text-[14px] font-montserrat font-medium leading-[1.3] rounded-[8px] transition-all duration-300 w-full sm:w-auto ${
                      hasBrochure && !isDownloadingBrochure
                        ? 'bg-[#f26522] text-white shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-[#e55a1f] hover:scale-105 cursor-pointer active:scale-95'
                        : hasBrochure && isDownloadingBrochure
                        ? 'bg-[#f26522] text-white cursor-wait'
                        : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                >
                    {isDownloadingBrochure ? (
                      <svg className="animate-spin w-4 h-4 sm:w-[18px] sm:h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12.75L4.5 8.25H7.5V3H10.5V8.25H13.5L9 12.75Z" fill="currentColor"/>
                      </svg>
                    )}
                    <span className="whitespace-nowrap">
                      {isDownloadingBrochure ? 'Downloading...' : hasBrochure ? 'Get Brochure' : 'Coming Soon'}
                    </span>
                  </button>
                  
                  {/* Whitepaper Button */}
                  <button
                    onClick={handleWhitepaperDownload}
                    disabled={!hasWhitepaper || isDownloading}
                    className={`inline-flex items-center justify-center gap-2 sm:gap-[10px] px-3 sm:px-[14px] py-2.5 sm:py-[10px] text-[13px] sm:text-[14px] font-montserrat font-medium leading-[1.3] rounded-[8px] border transition-all duration-300 w-full sm:w-auto ${
                      hasWhitepaper && !isDownloading
                        ? 'bg-[#fffefd] border-[#f26522] text-[#f26522] shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)] hover:bg-gray-50 hover:scale-105 cursor-pointer active:scale-95'
                        : hasWhitepaper && isDownloading
                        ? 'bg-[#f26522] border-[#f26522] text-white cursor-wait'
                        : 'bg-gray-400 border-gray-400 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {isDownloading ? (
                      <svg className="animate-spin w-4 h-4 sm:w-[18px] sm:h-[18px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H15M3 9H15M3 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    <span className="whitespace-nowrap">
                      {isDownloading ? 'Downloading...' : hasWhitepaper ? 'Whitepaper' : 'Coming Soon'}
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Right Column - Image */}
              <div className="h-[200px] sm:h-[240px] md:h-[260px] lg:h-[287px] relative rounded-[10px] w-full lg:w-[399px] flex-shrink-0 overflow-hidden">
                <img 
                  alt="Product illustration" 
                  className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] w-full h-full" 
                  src="/illustration about us.png"
                  onError={(e) => {
                    // Fallback to bg-product.png if image fails to load
                    (e.target as HTMLImageElement).src = '/bg-product.png';
                  }}
                />
              </div>
            </div>
            </div>
          </div>

        </div>
      </div>

      {/* Benefit Section - Same as ProductDetailLayout1 */}
      <div className="bg-[#fffefd] px-4 sm:px-6 md:px-8 lg:px-[100px] py-8 sm:py-10 md:py-12 lg:py-[60px]">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-[36px] items-start justify-center max-w-[1128px] mx-auto">
          {/* Title - Left Column */}
          <div className="w-full lg:w-[279px] flex-shrink-0">
            <p className="font-montserrat font-semibold leading-[1.3] text-[#ff5001] text-[20px] sm:text-[24px] md:text-[32px] lg:text-[43px]">
              Benefit {productTitle}
            </p>
            </div>

          {/* Content Wrapper - Middle & Right Columns */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-[36px] w-full lg:w-auto flex-1">
            {/* Sidebar Menu - Middle Column */}
            <div className="flex flex-col gap-3 sm:gap-[14px] items-start w-full md:w-[280px] lg:w-[336px] flex-shrink-0">
              {displayBenefits.map((benefit, index) => (
                <button
                  key={benefit.id}
                  onClick={() => setActiveBenefit(index)}
                  className={`flex items-center gap-3 sm:gap-[14px] p-2 sm:p-0 transition-all duration-300 w-full rounded-lg sm:rounded-none hover:bg-[#fff3ed] sm:hover:bg-transparent ${
                    activeBenefit === index ? 'text-[#f26522]' : 'text-[#888888]'
                  }`}
                >
                  <div
                    className={`w-[40px] h-[40px] sm:w-[43px] sm:h-[43px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      activeBenefit === index ? 'bg-[#f26522] scale-105' : 'bg-[#888888]'
                    }`}
                  >
                    <span className="font-montserrat font-medium text-[16px] sm:text-[18px] text-white">
                      {index + 1}
                    </span>
                  </div>
                  <span className="font-montserrat font-medium text-[14px] sm:text-[16px] leading-[1.3] text-left flex-1">
                    {benefit.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Detail Description - Right Column */}
            <div className="flex flex-col gap-3 sm:gap-[14px] items-start w-full md:flex-1 lg:w-[441px] flex-shrink-0">
              {/* Benefit Title */}
              <div className="font-montserrat font-medium text-[14px] sm:text-[16px] leading-[1.3] text-[#121212] w-full">
                <p className="mb-0">
                  {displayBenefits[activeBenefit]?.title || displayBenefits[0]?.title}
                </p>
              </div>
              
              {/* Benefit Description */}
              <p className="font-montserrat font-normal text-[14px] sm:text-[16px] leading-[1.5] sm:leading-[1.3] text-[#3d3d3d] w-full">
                {displayBenefits[activeBenefit]?.description || displayBenefits[0]?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
