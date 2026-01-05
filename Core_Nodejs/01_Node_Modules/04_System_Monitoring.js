// Creating a system resource monitoring cli app using nodejs inbuilt "os" module

import chalk from "chalk";
import os from "node:os";

// console.log(os.cpus())

function monitor() {
  // take a snapshot
  // take another snapshot after 1 second

  const oldCpus = os.cpus();

  setTimeout(() => {
    const newCpus = os.cpus();

    const usage = newCpus.map((cpu, i) => {
      return {
        core: i,
        usage: calculateCpu(oldCpus[i], newCpus[i]) + "%",
      };
    });

    console.clear();
    console.log(chalk.blue.bgRed.bold('******** System Stats ********'))
    console.table(usage);

    const usedMem = (os.totalmem() - os.freemem()) / (1024*1024*1024)
    console.log(`Used Memory -> ${usedMem.toFixed(1)}% / ${(os.totalmem()/(1024*1024*1024)).toFixed(1)}%`)
  }, 1000);
}

// function to calculate cpu usage
function calculateCpu(oldCpus, newCpus) {
  const oldTotal = Object.values(oldCpus.times).reduce((a, b) => a + b);

  const newTotal = Object.values(newCpus.times).reduce((a, b) => a + b);

  const idle = newCpus.times.idle - oldCpus.times.idle;

  const total = newTotal - oldTotal;

  const used = total - idle;

  return ((100 * used) / total).toFixed(1);
}
setInterval(monitor, 1000);

/*
[
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 208609, nice: 0, sys: 202609, idle: 4794937, irq: 22375 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 187875, nice: 0, sys: 142156, idle: 4876015, irq: 9171 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 236703, nice: 0, sys: 194125, idle: 4775218, irq: 17062 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 194953, nice: 0, sys: 143265, idle: 4867828, irq: 8203 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 44156, nice: 0, sys: 48390, idle: 5113484, irq: 2000 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 47140, nice: 0, sys: 45234, idle: 5113656, irq: 2015 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 42984, nice: 0, sys: 41312, idle: 5121734, irq: 1625 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 35062, nice: 0, sys: 38109, idle: 5132859, irq: 1062 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 47921, nice: 0, sys: 54140, idle: 5103968, irq: 1937 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 49546, nice: 0, sys: 49359, idle: 5107156, irq: 2234 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 47609, nice: 0, sys: 45468, idle: 5112984, irq: 1843 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-1235U',
    speed: 2496,
    times: { user: 46265, nice: 0, sys: 46656, idle: 5113109, irq: 1687 }
  }
]
*/
