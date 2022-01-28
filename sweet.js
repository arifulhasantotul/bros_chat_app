Swal.fire({
  title: "Delete?",
  text: "You won't be able to revert this!",
  icon: "question",
  showCancelButton: true,
  confirmButtonColor: "#2ecc71",
  cancelButtonColor: "#ff4757",
  confirmButtonText: "Delete!",
  cancelButtonText: "keep!",
  color: "#ffa502",
  background: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      toast: true,
      position: "top-end",
      title: "Deleted !",
      text: "Message deleted.",
      icon: "success",
      background: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      toast: true,
      position: "top-end",
      title: "Cancelled !",
      text: "Your file has been deleted.",
      icon: "info",
      color: "#fff",
      background:
        "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
