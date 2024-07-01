<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Services\ProjectService;
use App\Services\TaskService;
use App\Services\UserService;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    private $taskService;

    private $userService;

    private $projectService;

    public function __construct(TaskService $taskService, UserService $userService, ProjectService $projectService){
        $this->taskService = $taskService;
        $this->userService = $userService;
        $this->projectService = $projectService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tasks = $this->taskService->getTasksPaginated($request);
        return inertia("Task/Index", [
            'tasks' => $tasks,
            'queryParams' => sizeof(request()->query()) === 0 ? json_decode('{ }') : request()->query(),
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = $this->userService->getAllUsers();
        $projects = $this->projectService->getAllProjects();
        return inertia('Task/Create', [
            'users' => $users,
            'projects' => $projects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $task = $this->taskService->createTask($data);
        $name = $task->name;
        return to_route('task.index')->with('success', "New Task \"$name\" was created!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return Inertia('Task/Show', [
            'task' => new TaskResource($task),
            'queryParams' => sizeof(request()->query()) === 0 ? json_decode('{ }') : request()->query()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return inertia('Task/Edit', [
            'task' => new TaskResource($task)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $this->taskService->updateTask($task, $data);
        return to_route('project.index')->with('success', "Project \"$task->name\" was updated!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $this->taskService->deleteTask($task);
        return to_route('project.index')->with('success', "Project \"$name\" was deleted!");
    }
}
