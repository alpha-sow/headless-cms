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
                    </nav>
                </div>
            </div>
        </div>
        <!-- Main content -->
        <div class="flex flex-col flex-1">
            <!-- Nav bar -->
            <nav class="bg-gray-800">
                <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div class="relative flex h-16 items-center justify-between">
                        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <!-- Mobile menu button-->
                            <button onclick="toggleMenuMobile()" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                                <span class="absolute -inset-0.5"></span>
                                <span class="sr-only">Open main menu</span>
                                <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <svg class="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <button type="button" class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                                <span class="absolute -inset-1.5"></span>
                                <span class="sr-only">View notifications</span>
                                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                            </button>

                            <!-- Profile dropdown -->
                            <div class="relative ml-3">
                                <div>
                                    <button onclick="toggleMenu()" type="button"
                                            class="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                            id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                        <span class="absolute -inset-1.5"></span>
                                        <span class="sr-only">Open user menu</span>
                                        <img class="size-8 rounded-full"
                                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                             alt="">
                                    </button>
                                </div>
                                <div id="user-menu"
                                     class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                                     role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                                     tabindex="-1">
                                    <!-- Active: "bg-gray-100 outline-hidden", Not Active: "" -->
                                    <button href="#" class="block px-4 py-2 text-sm text-gray-700 w-full hover:bg-gray-50" role="menuitem"
                                       tabindex="-1" id="user-menu-item-0">Your Profile</button>
                                    <form action="/logout" method="post">
                                        ${csrfHiddenInput}
                                        <button type="submit" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full" role="menuitem"
                                           tabindex="-1" id="user-menu-item-2">Sign out</button>
                                    </form>
                                </div>
                                <script>
                                    function toggleMenu() {
                                        const menu = document.getElementById('user-menu');
                                        menu.classList.toggle('hidden');
                                    }
                                    document.addEventListener('click', function (event) {
                                        const menu = document.getElementById('user-menu');
                                        const menuButton = document.getElementById('user-menu-button');

                                        if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
                                            menu.classList.add('hidden');
                                        }
                                    });
                                </script>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile menu, show/hide based on menu state. -->
                <div class="hidden sm:hidden" id="mobile-menu">
                    <div class="space-y-1 px-2 pt-2 pb-3">
                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Home</a>
                    </div>
                    <script>
                        function toggleMenuMobile() {
                            const menu = document.getElementById('mobile-menu');
                            menu.classList.toggle('hidden');
                        }
                    </script>
                </div>
            </nav>

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