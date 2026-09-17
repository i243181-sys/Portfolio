import {
  Brain,
  Database,
  FileCode2,
  FileText,
  Leaf,
  LockKeyhole,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { Project } from "../data/portfolio";

// Abstract illustrations of the CV's project concepts, not application screenshots.
export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  return (
    <div
      className={`project-illustration illustration-${visual}`}
      aria-hidden="true"
    >
      {visual === "retrieval" && (
        <>
          <div className="document-stack">
            <span />
            <span />
            <div>
              <FileText size={23} />
              <i />
              <i />
            </div>
          </div>
          <div className="flow-connector">
            <span />
          </div>
          <div className="visual-core">
            <Brain size={33} strokeWidth={1.4} />
          </div>
          <div className="flow-connector">
            <span />
          </div>
          <div className="visual-endpoint">
            <FileCode2 size={26} strokeWidth={1.5} />
          </div>
        </>
      )}
      {visual === "leaf" && (
        <>
          <div className="leaf-scan">
            <span className="scan-corner corner-tl" />
            <span className="scan-corner corner-tr" />
            <span className="scan-corner corner-bl" />
            <span className="scan-corner corner-br" />
            <Leaf size={67} strokeWidth={1.2} />
            <span className="scan-line" />
          </div>
          <span className="visual-chip leaf-chip">IMAGE ANALYSIS</span>
        </>
      )}
      {visual === "database" && (
        <>
          <div className="data-spoke spoke-one" />
          <div className="data-spoke spoke-two" />
          <div className="data-spoke spoke-three" />
          <div className="visual-core">
            <Database size={36} strokeWidth={1.4} />
          </div>
          <span className="data-node data-node-one">
            <Users size={18} />
          </span>
          <span className="data-node data-node-two">
            <LockKeyhole size={18} />
          </span>
          <span className="data-node data-node-three">
            <FileText size={18} />
          </span>
          <span className="visual-chip data-chip">ACID · RBAC</span>
        </>
      )}
      {visual === "route" && (
        <>
          <div className="route-map">
            <span className="route-segment segment-one" />
            <span className="route-segment segment-two" />
            <span className="route-segment segment-three" />
            <span className="route-waypoint waypoint-one" />
            <span className="route-waypoint waypoint-two" />
            <span className="route-waypoint waypoint-three" />
            <span className="route-waypoint waypoint-four" />
            <span className="route-label route-start">DEPARTURE</span>
            <span className="route-label route-end">DESTINATION</span>
            <span className="route-marker">
              <Route size={20} />
            </span>
          </div>
        </>
      )}
      {visual === "traffic" && (
        <>
          <div className="intersection">
            <span className="road road-horizontal" />
            <span className="road road-vertical" />
            <span className="car car-one" />
            <span className="car car-two" />
            <span className="car car-three" />
            <span className="traffic-signal">
              <i />
              <i />
              <i />
            </span>
          </div>
          <span className="visual-chip traffic-chip">SYNCHRONIZED FLOW</span>
        </>
      )}
      {visual === "shield" && (
        <>
          <div className="case-records">
            <span>
              <FileText size={16} />
              <i />
            </span>
            <span>
              <FileText size={16} />
              <i />
            </span>
            <span>
              <FileText size={16} />
              <i />
            </span>
          </div>
          <div className="security-ring" />
          <div className="security-badge">
            <ShieldCheck size={52} strokeWidth={1.2} />
          </div>
          <span className="visual-chip shield-chip">ACCESS · AUDIT</span>
        </>
      )}
    </div>
  );
}
