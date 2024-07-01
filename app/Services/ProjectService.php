<?php

namespace App\Services;

use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectService
{
    public function getProjectsPaginated($request)
    {
        $query = Project::query();

        $sortField = $request->get('sort_field', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        if ($request->has('name')) {
            $query->where("name", "like", "%" . $request->get('name') . "%");
        }
        if ($request->has('status')) {
            $query->where("status", $request->get('status'));
        }
        $projects = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return ProjectResource::collection($projects);
    }

    public function createProject($data)
    {
        $data['created_by'] = auth()->id();
        $data['updated_by'] = auth()->id();
        /** @var $image UploadedFile */
        $image = $data['image'] ?? null;
        if ($image) {
            $data['image_path'] = $image->store('project/' . Str::random(10), 'public');
        }
        return Project::create($data);
    }

    public function updateProject($project, $data)
    {
        $data['updated_by'] = auth()->id();
        /** @var $image UploadedFile */
        $image = $data['image'] ?? null;
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::random(10), 'public');
        }
        $project->update($data);
    }

    public function deleteProject($project)
    {
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        $project->delete();
    }

    public function getAllProjects()
    {
        return ProjectResource::collection(Project::all());
    }

}
