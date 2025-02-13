import { Box, LinearProgress, Typography } from "@mui/material"

interface CollectionProgressProps {
  collectedCount: number
  totalCount: number
}

export default function CollectionProgress({ collectedCount, totalCount }: CollectionProgressProps) {
  const completionPercentage = Math.round((collectedCount / totalCount) * 100)

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mt: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{ height: "10px", borderRadius: "5px", flexGrow: 1 }}
        />
        <Typography variant="body2" sx={{ ml: 2, fontWeight: "bold" }}>
          {completionPercentage}%
        </Typography>
      </Box>

      <Typography sx={{ textAlign: "center", mt: 1 }}>
        {collectedCount}/{totalCount} items collected
      </Typography>
    </Box>
  )
}
