'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface PartnershipEcosystemProps {
  className?: string;
}

const PartnershipEcosystem: React.FC<PartnershipEcosystemProps> = ({ className }) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('partnership-ecosystem');

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    switch (sectionId) {
      case 'partnership-ecosystem':
        router.push('/partnership-ecosystem');
        break;
      case 'terms':
        router.push('/terms-and-conditions');
        break;
      case 'privacy':
        router.push('/privacy-policy');
        break;
      case 'acceptable-use':
        router.push('/acceptable-use');
        break;
      default:
        break;
    }
  };

  const sections = [
    { id: 'acceptable-use', title: 'Acceptable Use' },
    { id: 'terms', title: 'Terms & Conditions' },
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'partnership-ecosystem', title: 'Partnership Ecosystem' }
  ];

  const partnershipContent = [
    {
      title: "Partnership Ecosystem",
      effectiveDate: "Effective 20 May 2025",
      introduction: "Nexus Quantum's Partnership Ecosystem is designed to foster collaboration, innovation, and mutual growth within the AI infrastructure community. We believe in building strong relationships with technology partners, system integrators, and solution providers to deliver comprehensive AI solutions to our customers.",
      content: "Our ecosystem includes strategic partnerships with leading technology vendors, certified system integrators, and specialized solution providers. We offer various partnership tiers including Technology Partners, Solution Partners, and Channel Partners, each with specific benefits and requirements."
    }
  ];

  const technologyPartners = [
    {
      name: "NVIDIA",
      description: "Strategic collaboration across NQRust-SecureGPU and NQRust-LLMOps. Joint optimization of MIG/SR-IOV slicing for H100/A100 architectures achieving 90% GPU utilization vs industry 30%. Co-development of confidential GPU computing for NQRust-Enclave with hardware attestation support."
    },
    {
      name: "Intel",
      description: "Deep integration with NQRust-Enclave TDX confidential computing and NQRust-HV optimization. Co-engineering Xeon processor performance for sub-100ms microVM boot times and less than 90ms enclave startup with 3% overhead."
    },
    {
      name: "AMD",
      description: "Partnership for NQRust-Enclave SEV-SNP implementation and EPYC processor validation. Joint development delivers 99% native throughput on analytics workloads with hardware-backed memory encryption."
    },
    {
      name: "Red Hat",
      description: "Enterprise Linux optimization for NQRust-FleetMgr orchestration and OpenShift integration. Certified operators enable unified management of containers, microVMs, and GPU workloads across hybrid environments."
    },
    {
      name: "Kubernetes Foundation",
      description: "Core contributor extending K8s with NQRust-FleetMgr's Unified Workload spec. Native microVM orchestration and AI-aware scheduling achieving 90% CPU, 96% GPU, 99% storage utilization."
    },
    {
      name: "Microsoft",
      description: "Strategic partnership for NQRust-Identity Active Directory integration and NQRust-ZeroCode SQL Server connectivity."
    },
    {
      name: "Oracle",
      description: "Database integration partnership for NQRust-ZeroCode and NQRust-Lake with Oracle Database connectivity."
    },
    {
      name: "OAuth Foundation / OpenID Foundation",
      description: "Standards compliance partnership for NQRust-Identity implementing OAuth 2.0, OpenID Connect, and SAML protocols."
    },
    {
      name: "Object Management Group (OMG)",
      description: "Standards collaboration for NQRust-BPMN implementing BPMN 2.0 and DMN specifications for enterprise workflow automation."
    }
  ];

  const cloudPartners = [
    {
      name: "Amazon Web Services (AWS)",
      description: "Hybrid integration enabling NQRust-Edge workload bursting to AWS GPU instances during demand spikes. Joint solutions for NQRust-Lake data lakehouse with S3 tiering and disaster recovery. NQRust-Identity AWS IAM policy compatibility and NQRust-ZeroCode API Gateway integration."
    },
    {
      name: "Google Cloud Platform (GCP)",
      description: "Partnership for NQRust-Analytics integration with BigQuery and Vertex AI pipelines. Combined solutions enable hybrid MLOps with on-premises NQRust-LLMOps training. NQRust-Identity Google social login integration and NQRust-BPMN Cloud Functions deployment."
    },
    {
      name: "Microsoft Azure",
      description: "Integration with Azure Arc for unified NQRust-FleetMgr management across hybrid environments. Joint confidential computing solutions for maximum data sovereignty. NQRust-Identity Active Directory integration and NQRust-ZeroCode Azure SQL Database connectivity."
    },
    {
      name: "Oracle Cloud",
      description: "Strategic partnership for NQRust-Lake integration with Oracle Autonomous Database and OCI GPU instances. NQRust-ZeroCode native Oracle Database connectivity and automated API generation."
    }
  ];

  const hardwarePartners = [
    {
      name: "Dell Technologies",
      description: "Validated PowerEdge configurations for NQRust-AI Appliance with optimized NVLink topology. Joint turnkey solutions featuring up to 16x H100 SXM5 GPUs."
    },
    {
      name: "HPE",
      description: "Collaboration on ProLiant and Apollo systems optimized for NQRust-Storage fabric achieving 2.5M IOPS/node and sub-100 microsecond latency."
    },
    {
      name: "Lenovo",
      description: "Partnership for ThinkSystem server validation and NQRust-Edge ruggedized deployments supporting 1,000+ sites with 99.9% uptime."
    },
    {
      name: "Supermicro",
      description: "Hardware optimization for GPU-dense NQRust-AI Appliance configurations with advanced cooling solutions."
    },
    {
      name: "Pure Storage",
      description: "Integration between NQRust-Storage distributed fabric and FlashArray systems enabling 89% cost reduction and 12x I/O performance improvement."
    }
  ];

  return (
    <div className={cn('bg-white flex flex-col items-start relative w-full min-h-screen', className)}>
      {/* Navbar */}
      <Navbar />

      {/* Desktop Layout */}
      <div className="hidden md:flex bg-[#fffefd] gap-[28px] items-start justify-center overflow-clip pb-[60px] pt-[153px] px-[100px] relative shrink-0 w-full">
        {/* Side Menu */}
        <div className="bg-[#fffefd] box-border flex flex-col gap-[14px] h-[239px] items-start p-[14px] relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] shrink-0 w-[250px]">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "box-border flex gap-[10px] items-center px-[14px] py-[10px] relative rounded-[8px] shrink-0 w-full transition-colors duration-200",
                activeSection === section.id
                  ? "bg-[rgba(242,101,34,0.1)] border-[#f26522] border-[0px_0px_1px] border-solid"
                  : "hover:bg-gray-50"
              )}
            >
              <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#551d00] text-[14px] text-nowrap whitespace-pre">
                {section.title}
              </p>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="basis-0 bg-[#fffefd] box-border flex flex-col gap-[14px] grow items-start min-h-px min-w-px p-[28px] relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] shrink-0">
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#0b1f3a] text-[32px] text-center w-full">
              {partnershipContent[0].title}
            </p>
            <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <p className="font-poppins leading-[1.3] not-italic relative shrink-0 text-[14px] text-center text-neutral-800 w-full">
                {partnershipContent[0].effectiveDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              {partnershipContent[0].introduction}
            </p>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              {partnershipContent[0].content}
            </p>
          </div>

          {/* Technology Partners Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[18px] w-full">
              Technology Partners
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Strategic technology vendors and standards organizations driving innovation in AI infrastructure.
            </p>
            
            {technologyPartners.map((partner, index) => (
              <div key={index} className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                  {index + 1}. {partner.name}
                </p>
                <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          {/* Cloud Partners Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[18px] w-full">
              Cloud Partners
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Leading cloud providers enabling hybrid and multi-cloud AI infrastructure deployments.
            </p>
            
            {cloudPartners.map((partner, index) => (
              <div key={index} className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                  {index + 1}. {partner.name}
                </p>
                <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          {/* Hardware Partners Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[18px] w-full">
              Hardware Partners
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Validated hardware configurations and turnkey solutions for optimal AI infrastructure performance.
            </p>
            
            {hardwarePartners.map((partner, index) => (
              <div key={index} className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                  {index + 1}. {partner.name}
                </p>
                <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          {/* Partner Value Proposition Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[18px] w-full">
              Partner Value Proposition: AI-Ready Data Center
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              The partner ecosystem delivers the following to help organizations transform their data center portfolio with Nexus-powered AI infrastructure:
            </p>
            
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[16px] w-full">
                Validated Configurations
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                Pre-tested hardware/software combinations reducing deployment risk and accelerating time-to-production.
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[16px] w-full">
                Unified Support
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                Single-vendor accountability across the complete infrastructure stack with coordinated global service delivery.
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[16px] w-full">
                Open Standards
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                Kubernetes-native architecture with open-source compatibility preventing vendor lock-in while enabling customization.
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[16px] w-full">
                Rapid Time-to-Value
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                Reference architectures and automation tools enabling AI deployment in days rather than months.
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[16px] w-full">
                Global Scale
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                Partner network supporting worldwide deployment with local compliance and service delivery capabilities.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[18px] w-full">
              Join Our Ecosystem
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Interested in becoming a Nexus Quantum partner? Contact our partnership team to learn more about opportunities and requirements.
            </p>
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                Email: partnerships@nexusquantum.id
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
                General Contact: /contact
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden bg-[#fffefd] flex flex-col gap-[14px] items-center justify-end overflow-clip px-[16px] py-[30px] relative shrink-0 w-full">
        <div className="box-border flex flex-col gap-[14px] items-start px-0 py-[28px] relative shrink-0 w-[380px]">
          <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#121212] text-[18px] text-center w-full">
              {partnershipContent[0].title}
            </p>
            <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
              <p className="font-poppins leading-[1.3] not-italic relative shrink-0 text-[14px] text-center text-neutral-800 w-full">
                {partnershipContent[0].effectiveDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              {partnershipContent[0].introduction}
            </p>
          </div>

          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              {partnershipContent[0].content}
            </p>
          </div>

          {/* Technology Partners Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Technology Partners
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              Strategic technology vendors and standards organizations driving innovation in AI infrastructure.
            </p>
            
            {technologyPartners.map((partner, index) => (
              <div key={index} className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                  {index + 1}. {partner.name}
                </p>
                <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          {/* Cloud Partners Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Cloud Partners
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              Leading cloud providers enabling hybrid and multi-cloud AI infrastructure deployments.
            </p>
            
            {cloudPartners.map((partner, index) => (
              <div key={index} className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                  {index + 1}. {partner.name}
                </p>
                <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          {/* Hardware Partners Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Hardware Partners
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              Validated hardware configurations and turnkey solutions for optimal AI infrastructure performance.
            </p>
            
            {hardwarePartners.map((partner, index) => (
              <div key={index} className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                  {index + 1}. {partner.name}
                </p>
                <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>

          {/* Partner Value Proposition Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Partner Value Proposition: AI-Ready Data Center
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              The partner ecosystem delivers the following to help organizations transform their data center portfolio with Nexus-powered AI infrastructure:
            </p>
            
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[14px] w-full">
                Validated Configurations
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                Pre-tested hardware/software combinations reducing deployment risk and accelerating time-to-production.
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[14px] w-full">
                Unified Support
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                Single-vendor accountability across the complete infrastructure stack with coordinated global service delivery.
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[14px] w-full">
                Open Standards
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                Kubernetes-native architecture with open-source compatibility preventing vendor lock-in while enabling customization.
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[14px] w-full">
                Rapid Time-to-Value
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                Reference architectures and automation tools enabling AI deployment in days rather than months.
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#f26522] text-[14px] w-full">
                Global Scale
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                Partner network supporting worldwide deployment with local compliance and service delivery capabilities.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-[14px] items-start relative shrink-0 w-full">
            <p className="font-montserrat font-semibold leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[16px] w-full">
              Join Our Ecosystem
            </p>
            <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
              Interested in becoming a Nexus Quantum partner? Contact our partnership team to learn more about opportunities and requirements.
            </p>
            <div className="flex flex-col gap-[8px] items-start relative shrink-0 w-full">
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                Email: partnerships@nexusquantum.id
              </p>
              <p className="font-montserrat font-normal leading-[1.3] relative shrink-0 text-[#3d3d3d] text-[14px] w-full">
                General Contact: /contact
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Side Menu */}
        <div className="bg-[#fffefd] box-border flex flex-col gap-[14px] h-[239px] items-start p-[14px] relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3),0px_2px_6px_2px_rgba(0,0,0,0.15)] shrink-0 w-full">
          <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#f26522] text-[18px] text-center w-full">
            Continue reading for related details
          </p>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "box-border flex gap-[10px] items-center px-[14px] py-[10px] relative rounded-[8px] shrink-0 w-full transition-colors duration-200",
                activeSection === section.id
                  ? "bg-[rgba(242,101,34,0.1)] border-[#f26522] border-[0px_0px_1px] border-solid"
                  : "hover:bg-gray-50"
              )}
            >
              <p className="font-montserrat font-medium leading-[1.3] relative shrink-0 text-[#551d00] text-[14px] text-nowrap whitespace-pre">
                {section.title}
              </p>
            </button>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PartnershipEcosystem;
