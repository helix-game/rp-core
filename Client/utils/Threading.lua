local coresume, costatus = coroutine.resume, coroutine.status
local debug = debug
local coroutine_close = coroutine.close or (function(c) end) -- 5.3 compatibility
local hadThread = false

local newThreads = {}
local threads = setmetatable({}, {
	-- This circumvents undefined behaviour in "next" (and therefore "pairs")
	__newindex = newThreads,
	-- This is needed for CreateThreadNow to work correctly
	__index = newThreads
})

local runningThread
local curTime = 0

local function resumeThread(coro) -- Internal utility
	if coroutine.status(coro) == "dead" then
		threads[coro] = nil
		coroutine_close(coro)
		return false
	end

	runningThread = coro
	
	local thread = threads[coro]

	if thread then
		-- if thread.name then
		-- 	ProfilerEnterScope(thread.name)
		-- else
		-- 	ProfilerEnterScope('thread')
		-- end
		-- _sbs(thread.boundary, coro)
	end
	
	local ok, wakeTimeOrErr = coresume(coro)
	
	if ok then
		thread = threads[coro]
		if thread then
			thread.wakeTime = wakeTimeOrErr and -1 or 0
			hadThread = true
		end
	else
		print("Error resuming coroutine")
	end
	
	runningThread = nil
	
	-- ProfilerExitScope()
	
	-- Return not finished
	return costatus(coro) ~= "dead"
end

function CreateThread(threadFunction)
	local di = debug.getinfo(threadFunction, 'S')
	
    threads[coroutine.create(threadFunction)] = {
		wakeTime = 0,
		name = ('thread %s[%d..%d]'):format(di.short_src, di.linedefined, di.lastlinedefined)
	} 

	hadThread = true
end

function Await(promise)
	local coro = coroutine.running()
	if not coro then
		error("Current execution context is not in the scheduler, you should use CreateThread / SetTimeout or Event system (AddEventHandler) to be able to Await")
	end

	-- Indicates if the promise has already been resolved or rejected
	-- This is a hack since the API does not expose its state
	local isDone = false
	local result, err
	promise = promise:next(function(...)
		isDone = true
		result = {...}
	end,function(error)
		isDone = true
		err = error
	end)

	if not isDone then
		local threadData = threads[coro]
		threads[coro] = nil

		local function reattach()
			threads[coro] = threadData
			resumeThread(coro)
		end

		promise:next(reattach, reattach)
		Wait(0)
	end

	if err then
		error(err)
	end

	return table.unpack(result)
end

function Wait(msec)
	coroutine.yield(curTime + msec)
end

function GetScriptTime()
    return curTime
end

Client.Subscribe('Tick', function()
    curTime = curTime + 1
    if not hadThread then
        return
    end
    
    -- flag to skip thread exec if we don't have any
    local thisHadThread = false

    for coro, thread in pairs(newThreads) do
        rawset(threads, coro, thread)
        newThreads[coro] = nil

        thisHadThread = true
    end

    for coro, thread in pairs(threads) do
        if thread.wakeTime ~= -1 and curTime >= thread.wakeTime then
            resumeThread(coro)
        end

        thisHadThread = true
    end

    if not thisHadThread then
        hadThread = false
    end
end)