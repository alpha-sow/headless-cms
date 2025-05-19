@param dev.alphasow.headless_cms.advice.CsrfHiddenInput csrfHiddenInput

@template.src.main(content = @`
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="hidden md:flex md:flex-shrink-0">
            <div class="flex flex-col w-64 bg-gray-800">
                <div class="flex items-center justify-center h-16 bg-gray-900">
                    <span class="text-white font-bold text-lg">Dashboard</span>
                </div>
                <div class="flex flex-col flex-grow">
                    <nav class="flex-1 px-2 py-4 space-y-1">
                        <a href="#"
                           class="flex items-center px-2 py-2 text-sm font-medium text-white bg-gray-900 rounded-md">
                            <span>Home</span>
                        </a>
                        <a href="#"
                           class="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700">
                            <span>Reports</span>
                        </a>
                        <a href="#"
                           class="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700">
                            <span>Settings</span>
                        </a>
                        <form action="/logout" method="post">
                            ${csrfHiddenInput}
                            <button type="submit"
                                    class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                Logout
                            </button>
                        </form>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Main content -->
        <div class="flex flex-col flex-1">
            <header class="bg-white shadow">
                <div class="px-4 py-6 mx-auto">
                    <h1 class="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                </div>
            </header>

            <main class="flex-1 overflow-y-auto p-4">
                <div class="mx-auto">
                    <!-- Add your dashboard content here -->
                    <div class="bg-white rounded-lg shadow p-6">
                        <h2 class="text-lg font-medium mb-4">Welcome to your dashboard</h2>
                        <p class="text-gray-600">This is your main dashboard content area.</p>
                    </div>
                </div>
            </main>
        </div>
    </div>
`)