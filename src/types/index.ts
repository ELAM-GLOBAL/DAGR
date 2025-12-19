export type WidgetStatus =
    | 'NeedsSetup'
    | 'Configured'
    | 'Optional'
    | 'Disabled'
    | 'Blocked'
    | 'Running'
    | 'Success'
    | 'Error';

export interface WidgetNode {
    id: string;
    title: string;
    lane: string; // 'Architect' | 'Engineer' | 'Analyst' | 'Scientist' | 'BI'
    laneIndex: number; // 0-4
    status: WidgetStatus;
    description?: string;
    isOptional?: boolean;
    isDisabled?: boolean; // For placeholder like Macro Data
    config?: Record<string, any>;
}

export interface WidgetEdge {
    id: string;
    source: string;
    target: string;
    type: 'solid' | 'dashed';
    label?: string;
}

export interface WorkflowData {
    nodes: WidgetNode[];
    edges: WidgetEdge[];
}
