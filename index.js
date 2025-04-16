const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

app.post('/functions/quicksort', (req, res) => {
  const arr = req.body.input;

  console.log("Received request body:", req.body);  // Log for debugging

  if (!arr) {
    return res.status(400).json({ error: 'Input is missing in the request body.' });
  }

  if (!Array.isArray(arr)) {
    return res.status(400).json({ error: 'Input must be an array of numbers.' });
  }

  if (!arr.every(num => typeof num === 'number')) {
    return res.status(400).json({ error: 'All elements in the array must be numbers.' });
  }

  const result = quickSort(arr);
  res.json({ output: result });
});

app.get('/functions/quicksort', (req, res) => {
  res.json({
    name: 'quicksort',
    description: 'Sorts an array of numbers using the Quick Sort algorithm. This implementation uses the last element as the pivot and recursively partitions the array.',
    input: {
      type: 'array',
      items: {
        type: 'number'
      },
      description: 'An array of numbers to be sorted.',
      example: [5, 2, 9, 1, 5, 6]
    },
    output: {
      type: 'array',
      description: 'A sorted array of numbers.',
      example: [1, 2, 5, 5, 6, 9]
    },
    contributing_guidelines: {
      description: 'To contribute to this function, follow these steps:',
      guidelines: [
        'Fork the repository and submit a pull request with your changes.',
        'Ensure the code is clean, well-documented, and properly tested.',
        'Add tests if necessary and ensure that all tests pass before submitting your changes.',
        'If adding a new feature or fixing a bug, make sure to describe the changes in your pull request description.',
        'If you encounter issues, report them via GitHub Issues or contact support on func.live.'
      ],
      issues: 'Please submit any issues or feature requests via GitHub Issues or contact func.live support.'
    },
    additional_resources: {
      description: 'For more details, refer to the README in the repository and the official func.live documentation.'
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

