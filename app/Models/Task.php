<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = ['image_path', 'name', 'due_date', 'description', 'status', 'created_by', 'updated_by', 'project_id', 'assigned_user_id', 'priority'];

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }


}
