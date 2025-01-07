const config = {
  gameStates: {
    NOT_STARTED: 'notStarted',
    IN_PROGRESS: 'inProgress',
    COMPLETED: 'completed',
  },
  categories: [
    { value: '', label: 'Any Category' },
    { value: '11', label: 'Movies' },
    { value: '14', label: 'Television' },
    { value: '14', label: 'Video Games' },
    { value: '18', label: 'Computers' },
    { value: '19', label: 'Mathematics' },
    { value: '20', label: 'Mythology' },
    { value: '22', label: 'Geographics' },
    { value: '21', label: 'Sports' },
    { value: '23', label: 'History' },
    { value: '24', label: 'Politics' },
    { value: '26', label: 'Celebrities' },
    { value: '28', label: 'Vehicles' },
  ].sort((a, b) => a.label.localeCompare(b.label)),
  difficulties: [
    { value: '', label: 'Any Difficulty'},
    { value: 'easy', label: 'Easy'},
    { value: 'medium', label: 'Medium'},
    { value: 'hard', label: 'Hard'},
  ],
}

export { config }