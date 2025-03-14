#pragma once

#include "JsiDomRenderNode.h"
#include "JsiPaintNode.h"

#include <memory>

namespace RNSkia {

class JsiDomDrawingNode : public JsiDomRenderNode {
public:
  JsiDomDrawingNode(std::shared_ptr<RNSkPlatformContext> context,
                    const char *type)
      : JsiDomRenderNode(context, type) {}

protected:
  void defineProperties(NodePropsContainer *container) override {
    JsiDomRenderNode::defineProperties(container);
    container->defineProperty(std::make_shared<PaintProp>());
  }

  /**
   Override to implement drawing.
   */
  virtual void draw(DrawingContext *context) = 0;

  void renderNode(DrawingContext *context) override {
#if SKIA_DOM_DEBUG
    printDebugInfo(context, "Begin Draw", 1);
#endif

#if SKIA_DOM_DEBUG
    printDebugInfo(context, context->getDebugDescription(), 2);
#endif
    draw(context);

    // Draw once more for each child paint node
    for (auto &child : getChildren()) {
      auto ptr = std::dynamic_pointer_cast<JsiPaintNode>(child);
      if (ptr != nullptr) {
        draw(ptr->getDrawingContext());
      }
    }
#if SKIA_DOM_DEBUG
    printDebugInfo(context, "End Draw", 1);
#endif
  }
};

} // namespace RNSkia
