<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Services\ProjectService;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    private $projectService;
    private $taskService;

    public function __construct(ProjectService $service, TaskService $taskService)
    {
        $this->projectService = $service;
        $this->taskService = $taskService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $projects = $this->projectService->getProjectsPaginated($request);
        return inertia("Project/Index", [
            'projects' => $projects,
            'queryParams' => sizeof(request()->query()) === 0 ? json_decode('{ }') : request()->query(),
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $project = $this->projectService->createProject($data);
        $name = $project->name;
        return to_route('project.index')->with('success', "New Project \"$name\" was created!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, Request $request)
    {
        $tasks = $this->taskService->getTaskByProject($project, $request);
        return Inertia('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => $tasks,
            'queryParams' => sizeof(request()->query()) === 0 ? json_decode('{ }') : request()->query()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $this->projectService->updateProject($project, $data);
        return to_route('project.index')->with('success', "Project \"$project->name\" was updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        $this->projectService->deleteProject($project);
        return to_route('project.index')->with('success', "Project \"$name\" was deleted!");
    }
}
