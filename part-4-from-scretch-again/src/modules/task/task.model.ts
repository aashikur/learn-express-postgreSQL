interface Task {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    is_active: boolean;
    due_date?: Date;
    created_at: Date;
    updated_at: Date;
}